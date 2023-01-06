using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using zaginieni_webapp.Entities;
using zaginieni_webapp.Exceptions;
using zaginieni_webapp.Interfaces;

namespace zaginieni_webapp.Controllers
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Policy = "RequireAdminRole")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<User> _roleManager;
        private readonly IMissingPersonRepository _missingPersonRepository;
        private readonly IUserRepository _userRepository;

        public AdminController(IMissingPersonRepository missingPersonRepository, IUserRepository userRepository, UserManager<User> userManager, ApplicationDbContext context)
        {
            _missingPersonRepository = missingPersonRepository;
            _userRepository = userRepository;
            _userManager = userManager;
            _context = context;
        }

        //list of all users
        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return Ok(await _userRepository.GetUsersAsync());
        }

        [HttpGet("users/{id}")]
        public async Task<User> GetUserById(int id)
        {
            return await _userRepository.GetUserByIdAsync(id);
        }

        //users with roles
        [HttpGet("users-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .OrderBy(u => u.Email)
                .Select(u => new
                {
                    u.Id,
                    Email = u.Email,
                    Username = u.UserName,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    PhoneNumber = u.PhoneNumber,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                })
                .ToListAsync();

            return Ok(users);
        }

        //user role can be changed
        [HttpPut("users/{id}")]
        public async Task<ActionResult> EditRoles(string id, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(",").ToArray();
            var user = await _userManager.FindByIdAsync(id);

            if (user == null) return NotFound("Nie udało się znaleźć użytkownika o podanym id.");

            var userRoles = await _userManager.GetRolesAsync(user);
            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Nie udało się zmienić roli użytkownika.");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Nie udało się usunąć roli użytkownika.");

            return Ok(await _userManager.GetRolesAsync(user));
        }

        //delete user
        [HttpDelete("users/{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                throw new NotFoundException("Nie znaleziono użytkownika o danym id.");
            }

            var result = await _userManager.DeleteAsync(user);

            return Ok(result);
        }
    }
}
