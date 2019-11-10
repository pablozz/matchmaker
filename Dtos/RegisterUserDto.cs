using System.ComponentModel.DataAnnotations;

namespace Matchmaker.Dtos
{
    public class RegisterUserDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(32, MinimumLength = 8, ErrorMessage = "You must specify a password between 8 and 32 characters.")]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Gender { get; set; }
    }
}
