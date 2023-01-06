namespace zaginieni_webapp.Models
{
    public class MemberDto
    {
        public int Id { get; set; } //primary key

        public string? Email { get; set; }

        public string? Username { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? PhoneNumber { get; set; }

        public DateTime DateOfBirth { get; set; }

    }
}
