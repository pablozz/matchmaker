using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Matchmaker.Dtos;
using Matchmaker.Models;
using Microsoft.EntityFrameworkCore;

namespace Matchmaker.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly MatchmakerContext _context;
        public AuthRepository(MatchmakerContext context)
        {
            _context = context;
        }
        public async Task<User> Login(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email); //Get user from database.
            if (user == null)
            {
                return null;
            }

            if (!VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            return user;
        }

        public async Task<User> Register(User user, string password)
        {
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user); // Adding the user to context of users.
            await _context.SaveChangesAsync(); // Save changes to database.

            return user;
        }

        public async Task<ActivationToken> GenerateActivationToken(string UserId)
        {
            var token = new ActivationToken()
            {   
                Id = Guid.NewGuid().ToString(),
                UserId = UserId,
            };

            await _context.ActivationTokens.AddAsync(token);
            await _context.SaveChangesAsync();
            return token;
        }

        public async Task<User> ActivateUser(string tokenId)
        {
            var token = await _context.ActivationTokens.SingleAsync(a => a.Id == tokenId);
            var user = await _context.Users.FindAsync(token.UserId);
            user.Activated = true;
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<List<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetCurrentUser(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Email == email);
        }

        public async Task<User> UpdateUser(string id, UserProfileDto userProfile)
        {
            if (id != userProfile.Id)
            {
                return null;
            }
            var user = await _context.Users.FirstOrDefaultAsync(user => user.UserId == id);
            user.Email = userProfile.Email;
            user.Name = userProfile.Name;
            user.Gender = userProfile.Gender;
            user.Role = userProfile.Role;
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> UserExists(string email)
        {
            if (await _context.Users.AnyAsync(x => x.Email == email))
            {
                return true;
            }
            return false;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                // Create hash using password salt.
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                if (!computedHash.SequenceEqual(passwordHash))
                {
                    return false;
                }
            }
            return true;
        }
    }
}
