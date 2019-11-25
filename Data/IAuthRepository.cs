using System.Threading.Tasks;
using System.Collections.Generic;
using Matchmaker.Dtos;
using Matchmaker.Models;

namespace Matchmaker.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string email, string password);
        Task<List<User>> GetUsers();
        Task<User> GetCurrentUser(string email);
        Task<User> UpdateUser(string id, UserProfileDto userProfile);
        Task<bool> UserExists(string email);
    }
}
