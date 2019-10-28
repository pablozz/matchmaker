using System.Collections.Generic;

namespace Matchmaker.Models
{
    public class SportsCenter
    {
        public string SportsCenterId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public List<Playground> Playgrounds { get; set; }
    }
}
