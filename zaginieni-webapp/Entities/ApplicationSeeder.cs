using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace zaginieni_webapp.Entities
{
    public class ApplicationSeeder
    {

        private readonly ApplicationDbContext _dbContext;

        public ApplicationSeeder(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public static async Task SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var roles = new List<Role>
            {
                new Role{Name = "Member"},
                new Role{Name = "Admin"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }  
        }
    }
}
