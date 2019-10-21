using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Matchmaker.Models
{
    public class Category
    {
        public string CategoryId { get; set; }
        public string Name { get; set; }

        public List<Activity> Activities { get; set; }
    }
}
