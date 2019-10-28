using System.Collections.Generic;

namespace Matchmaker.Models
{
    public class Admin
    {
        public string AdminId { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }

        public List<Activity> Activities { get; set; }
    }
}
