using System.Security.Claims;
using IHttpContextAccessor = Microsoft.AspNetCore.Http.IHttpContextAccessor;


namespace zaginieni_webapp.Services
    {
        public interface IUserContextService
        {
            ClaimsPrincipal User { get; }
            int? GetUserId { get; }
        }

        public class UserContextService : IUserContextService
        {
            private readonly IHttpContextAccessor _httpContextAccessor;

            public UserContextService(IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
            }

            public ClaimsPrincipal User => _httpContextAccessor.HttpContext?.User;

            public int? GetUserId =>
                User is null ? null : (int?)int.Parse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value);
        }
    }



