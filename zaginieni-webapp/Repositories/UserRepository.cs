using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using zaginieni_webapp.Entities;
using zaginieni_webapp.Interfaces;

namespace zaginieni_webapp.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UserRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //entity has been modified, we don't change anything in the database
        public void UpdateUser(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<MemberDto> GetUserInfoAsync(int id)
        {
            return await _context.Users
               .Where(x => x.Id == id)
               .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
               .SingleOrDefaultAsync();
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}
