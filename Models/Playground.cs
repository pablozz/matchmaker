using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Matchmaker.Models
{
    public class Playground
    {
        public int PlaygroundId { get; set; }
        public string NameOfPlace { get; set; }
        public int Size { get; set; }

        public int SportsCenterId { get; set; }

        public List<Activity> Activities { get; set; }
    }
}
