using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Matchmaker.Models
{
    public class SportsCenter
    {
        public int SportsCenterId { get; set; }
        public string Name { get; set; }
        public string Adress { get; set; }

        public List<Playground> Playgrounds { get; set; }
    }
}
