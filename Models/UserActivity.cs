namespace Matchmaker.Models
{
    public class UserActivity
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public string ActivityId { get; set; }
        public Activity Activity { get; set; }
    }
}
