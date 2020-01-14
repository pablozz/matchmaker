namespace Matchmaker.Models
{
    public class EmailChangeToken
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string NewEmail { get; set; }
    }
}
