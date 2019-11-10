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
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserActivity>()
                .HasKey(a => new { a.UserId, a.ActivityId });

            modelBuilder.Entity<UserActivity>()
                .HasOne(ua => ua.User)
                .WithMany(u => u.UserActivities)
                .HasForeignKey(ua => ua.UserId);

            modelBuilder.Entity<UserActivity>()
                .HasOne(ua => ua.Activity)
                .WithMany(a => a.UserActivities)
                .HasForeignKey(ua => ua.ActivityId);
        }
    }
}
