using Microsoft.EntityFrameworkCore;

namespace Matchmaker.Models
{
    public class MatchmakerContext : DbContext
    {
        public MatchmakerContext(DbContextOptions<MatchmakerContext> options)
            : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Playground> Playgrounds { get; set; }
        public DbSet<SportsCenter> SportsCenters { get; set; }
        public DbSet<User> Users  { get; set; }
    }
}
