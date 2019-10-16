using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Matchmaker.Models
{
    public class Activity
    {
        public int ActivityId { get; set; }
        public DateTime Date { get; set; }
        public string Gender { get; set; }
        public float Price { get; set; }
        public int NumberOfParticipants { get; set; }

        public int PlayGroundId { get; set; }
        public Playground Playground { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int AdminId { get; set; }
        public Admin Admin { get; set; }

        public List<User> Users { get; set; }
    }
}
