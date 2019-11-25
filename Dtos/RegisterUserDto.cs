using System.ComponentModel.DataAnnotations;

namespace Matchmaker.Dtos
{
    public class RegisterUserDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        [MinLength(8, ErrorMessage = "You must specify a password with at least 8 characters")]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Gender { get; set; }
    }
}
