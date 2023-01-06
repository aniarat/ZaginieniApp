namespace zaginieni_webapp.Entities
{
    public class User : IdentityUser<int>
    {
        public string? FirstName { get; set; } 

        public string? LastName { get; set; }

        //public DateTime DateOfBirth { get; set; }

        public DateTime DateTimeCreated { get; set; } = DateTime.Now;

        public ICollection<UserRole>? UserRoles { get; set; } //join table

    }
}
