using System;

namespace Matchmaker.Dtos
{
    public class AddActivityDto
    {
        public DateTime Date { get; set; }
        public string Gender { get; set; }
        public float Price { get; set; }
        public int NumberOfParticipants { get; set; }
        public int PlayerLevel { get; set; }
        public string PlaygroundId { get; set; }
        public string CategoryId { get; set; }
    }
}
