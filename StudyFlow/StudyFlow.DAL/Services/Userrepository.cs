﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.DAL.Services
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<User> _signInManager;

        public UserRepository(DataContext context, SignInManager<User> signInManager, UserManager<User> userManager) : base(context)
        {
            _context = context;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<User> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return null;
            }

            var result = await _signInManager.PasswordSignInAsync(user, password, false, false);
            if (result.Succeeded)
            {
                return user;
            }

            return null;
        }

        public async Task<User> RegisterAsync(User user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                return user;
            }

            return null;
        }

        public override async Task<PaginationResult<User>> GetAsync(Pagination pagination)
        {
            var query = _context.Users
                .AsNoTracking()
                .Include(x => x.Country)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => x.Email.Contains(pagination.Filter, StringComparison.OrdinalIgnoreCase));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<User>()
            {
                ListResult = await query
                    .Paginate(pagination)
                    .ToListAsync(),
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .AsNoTracking()
                .Include(x => x.Country)
                .FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(User user) => await _userManager.GenerateEmailConfirmationTokenAsync(user);

        public async Task<IdentityResult> ConfirmEmailAsync(User user, string token) => await _userManager.ConfirmEmailAsync(user, token);
    }
}