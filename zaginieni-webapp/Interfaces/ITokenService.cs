using zaginieni_webapp.Entities;

namespace zaginieni_webapp.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user);
    }
}
