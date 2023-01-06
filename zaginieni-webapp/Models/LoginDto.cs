using System.ComponentModel.DataAnnotations;

namespace zaginieni_webapp.Models
{
    public class LoginDto
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; } 
    }
}
