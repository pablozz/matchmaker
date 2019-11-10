using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Matchmaker.Data;
using Matchmaker.Dtos;
using Matchmaker.Models;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace Matchmaker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        [HttpPost("register")] //<host>/api/auth/register
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
                Gender = registerUserDto.Gender
            };

            await _repo.Register(user, registerUserDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
        {
            var existingUser = await _repo.Login(loginUserDto.Email, loginUserDto.Password);
            if (existingUser == null)
            {
                return Unauthorized();
            }

            //generate JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:Token").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.NameIdentifier, existingUser.UserId),
                    new Claim(ClaimTypes.Email, existingUser.Email)
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { tokenString });
        }
    }
}