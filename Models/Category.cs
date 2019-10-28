using System.Collections.Generic;

namespace Matchmaker.Models
{
    public class Category
    {
        public string CategoryId { get; set; }
        public string Name { get; set; }

        public List<Activity> Activities { get; set; }
    }
}
