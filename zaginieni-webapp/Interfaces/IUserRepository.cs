using zaginieni_webapp.Entities;

namespace zaginieni_webapp.Interfaces
{
    public interface IUserRepository
    {
        void UpdateUser(User user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<MemberDto> GetUserInfoAsync(int id);
        Task<User> GetUserByEmailAsync(string email);

    }
}
