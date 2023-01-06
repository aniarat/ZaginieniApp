using System.ComponentModel.DataAnnotations;

namespace zaginieni_webapp.Models
{
    public class RegisterUserDto
    {
        //public int Id { get; set; } //primary key
        
        public string? Username { get; set; }
        [Required]
        public string? Email { get; set; } 

        [Required]
        [MinLength(8)]
        public string? Password { get; set; } 

        [Required]
        [MinLength(8)]
        public string? ConfirmPassword { get; set; }

        [Required]
        public string? FirstName { get; set; } 

        [Required]
        public string? LastName { get; set; } 

        //public DateTime DateOfBirth { get; set; }

        [Required]
        public string? PhoneNumber { get; set; } 

        //public int RoleId { get; set; } = 1; //1 - user, 2 - police officer, 3 - admin
    }
}
