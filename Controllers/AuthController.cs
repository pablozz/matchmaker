using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Matchmaker.Data;
using Matchmaker.Dtos;
using Matchmaker.Helpers;
using Matchmaker.Models;
using Microsoft.AspNetCore.Authorization;
using Matchmaker.Services;

namespace Matchmaker.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IEmailSender _sender;

        public AuthController(IAuthRepository repo,  IEmailSender sender)
        {
            _repo = repo;
            _sender = sender;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await _repo.UserExists(registerUserDto.Email))
            {
                return BadRequest("Email is already taken");
            }

            var user = new User()
            {
                UserId = Guid.NewGuid().ToString(),
                Email = registerUserDto.Email,
                Name = registerUserDto.Name,
                Gender = registerUserDto.Gender,
                Role = Role.User,
                Activated = false
            };

            var createdUser = await _repo.Register(user, registerUserDto.Password);

            var token = await _repo.GenerateActivationToken(user.UserId);

            await _sender.SendActivationEmail(createdUser, token);

            return StatusCode(201);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
        {
            var user = await _repo.Login(loginUserDto.Email, loginUserDto.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            if (!user.Activated)
            {
                return BadRequest("User's account is not activated");
            }

            // generate JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("SECRET"));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.NameIdentifier, user.UserId),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { tokenString });
        }
        [AllowAnonymous]
        [HttpGet("{tokenId}")]
        public async Task<IActionResult> Activate(string tokenId)
        {
            var user = await _repo.ActivateUser(tokenId);
            if (user.Activated)
            {
                
                return Redirect(Urls.LoginUrl);
            }
            return BadRequest("Wrong activation token");
        }

        [Authorize(Roles = Role.SuperAdmin)]
        [HttpGet]
        public async Task<List<UserProfileDto>> Users()
        {
            var users = await _repo.GetUsers();
            return users.Select(user => new UserProfileDto
            {
                Id = user.UserId,
                Email = user.Email,
                Name = user.Name,
                Gender = user.Gender,
                Role = user.Role,
                Activated = user.Activated
            }).ToList();
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<UserProfileDto> CurrentUser()
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            if (email != null)
            {
                var user = await _repo.GetCurrentUser(email);

                return new UserProfileDto()
                {
                    Id = user.UserId,
                    Email = user.Email,
                    Name = user.Name,
                    Gender = user.Gender,
                    Role = user.Role
                };
            }

            return null;
        }
        [Authorize(Roles = Role.SuperAdmin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, UserProfileDto user)
        {
            var updatedUser = await _repo.UpdateUser(id, user);
            if (updatedUser == null)
            {
                return BadRequest();
            }
            return NoContent();
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> ChangeEmail(ChangeEmailDto changeEmailDto)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await _repo.GetCurrentUser(email);
            var token = await _repo.GenerateEmailChangeToken(userId, changeEmailDto.NewEmail);
            if (token is null)
            {
                return BadRequest("Email is already taken!");
            }
            await _sender.SendActivationEmail(user, token, changeEmailDto.NewEmail);

            return NoContent();
        }
        [AllowAnonymous]
        [HttpGet("{tokenId}")]
        public async Task<IActionResult> ActivateNewEmail(string tokenId)
        {
            var user = await _repo.ChangeEmail(tokenId);
            if (user is null)
            {
                return BadRequest("Wrong activation token");
            }
            
            return Redirect(Urls.UserAccountLink);
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _repo.ChangePassword(userId, changePasswordDto.OldPassword, changePasswordDto.NewPassword);
            if (user is null)
            {
                return BadRequest("Old password does not match current password");
            }
            return NoContent();
        }
    }
}