using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Matchmaker.Data;
using Matchmaker.Dtos;
using Matchmaker.Helpers;
using Matchmaker.Models;

namespace Matchmaker.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly AppSettings _appSettings;

        public AuthController(IAuthRepository repo, IOptions<AppSettings> appSettings)
        {
            _repo = repo;
            _appSettings = appSettings.Value;
        }

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
                Role = Role.User
            };

            await _repo.Register(user, registerUserDto.Password);

            return StatusCode(201);
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
        {
            var user = await _repo.Login(loginUserDto.Email, loginUserDto.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            //generate JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
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
    }
}