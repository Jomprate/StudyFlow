using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.DAL.Services
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<User> GetUserByEmailWithProfileAsync(string email)
        {
            return await _context.Users.Include(u => u.ListProfile).Include(c => c.Country).FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<IEnumerable<User>> GetUsersWithProfileAsync()
        {
            return await _context.Users.Include(u => u.ListProfile).Include(c => c.Country).ToArrayAsync();
        }

        public async Task<User> GetUserByIdWithProfileAsync(Guid id)
        {
            return await _context.Users.Include(u => u.ListProfile).Include(c => c.Country).FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}