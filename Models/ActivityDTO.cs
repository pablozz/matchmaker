using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Matchmaker.Models
{
    public class ActivityDTO
    {
        public string Id { get; set; }
        public double Date { get; set; }
        public string Gender { get; set; }
        public float Price { get; set; }
        public int Users { get; set; }
        public int NumberOfParticipants { get; set; }
        public int PlayerLevel { get; set; }
        public string Playground { get; set; }
        public SportsCenterDTO SportsCenter { get; set; }
        public string Category { get; set; }
    }
}
