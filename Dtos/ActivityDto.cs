using System;
using Matchmaker.Models;

namespace Matchmaker.Dtos
{
    public class ActivityDto
    {
        public string Id { get; set; }
        public double Date { get; set; }
        public string Gender { get; set; }
        public float Price { get; set; }
        public int Users { get; set; }
        public int NumberOfParticipants { get; set; }
        public int PlayerLevel { get; set; }
        public string Playground { get; set; }
        public SportsCenterDto SportsCenter { get; set; }
        public string Category { get; set; }

        public static ActivityDto FromActivity(Activity a) => new ActivityDto
        {
            Id = a.ActivityId,
            Date = a.Date.Subtract(new DateTime(1970, 1, 1, 0, 0, 0)).TotalSeconds,
            Gender = a.Gender,
            Price = a.Price,
            Users = a.RegisteredParticipants,
            NumberOfParticipants = a.NumberOfParticipants,
            PlayerLevel = a.PlayerLevel,
            Playground = a.Playground.NameOfPlace,
            SportsCenter = new SportsCenterDto()
            {
                Id = a.Playground.SportsCenter.SportsCenterId,
                Name = a.Playground.SportsCenter.Name,
                Address = a.Playground.SportsCenter.Address
            },
            Category = a.Category.Name
        };
    }
}
