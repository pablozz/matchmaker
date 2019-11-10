using System.Collections.Generic;

namespace Matchmaker.Models
{
    public class User
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }

        public List<UserActivity> UserActivities { get; set; }
    }
}
