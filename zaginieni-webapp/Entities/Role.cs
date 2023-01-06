using System.Collections;

namespace zaginieni_webapp.Entities
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole>? UserRoles { get; set; }
    }
}
