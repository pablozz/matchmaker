using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Matchmaker.Models
{
    public class Playground
    {
        public string PlaygroundId { get; set; }
        public string NameOfPlace { get; set; }
        public int Size { get; set; }

        public string SportsCenterId { get; set; }
        public SportsCenter SportsCenter { get; set; }

        public List<Activity> Activities { get; set; }
    }
}
