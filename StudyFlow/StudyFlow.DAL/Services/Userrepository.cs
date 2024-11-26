using Azure.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Interfaces;
using System.Security.Cryptography;
using System.Security.Policy;

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

        public async Task<SignInResult> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return null;
            }

            return await _signInManager.PasswordSignInAsync(user, password, false, true);
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
                .Include(x => x.Country)
                .FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(User user) => await _userManager.GenerateEmailConfirmationTokenAsync(user);

        public async Task<IdentityResult> ConfirmEmailAsync(User user, string token) => await _userManager.ConfirmEmailAsync(user, token);

        public override async Task<bool> DeleteAsync(User user)
        {
            var result = await _userManager.DeleteAsync(user);

            return result.Succeeded;
        }

        public async Task<bool> IsEmailConfirmedAsync(User user) => await _userManager.IsEmailConfirmedAsync(user);

        public async Task<string> GeneratePasswordResetTokenAsync(User user) => await _userManager.GeneratePasswordResetTokenAsync(user);

        public async Task<IdentityResult> ResetPasswordAsync(User user, string token, string newPassword) => await _userManager.ResetPasswordAsync(user, token, newPassword);

        public async Task<bool> ValidatePasswordAsync(User user, string password)
        {
            if (string.IsNullOrEmpty(user.PasswordHash))
                return false;

            var hashBytes = Convert.FromBase64String(user.PasswordHash);

            const int SaltSize = 16;
            const int KeySize = 32;
            const int Iterations = 10000;

            var salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);

            var key = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256).GetBytes(KeySize);

            for (int i = 0; i < KeySize; i++)
            {
                if (hashBytes[i + SaltSize] != key[i])
                    return false;
            }

            return true;
        }

        public async Task<bool> UpdatePasswordAsync(User user, string newPassword)
        {
            const int SaltSize = 16;
            const int KeySize = 32;
            const int Iterations = 10000;

            byte[] salt = new byte[SaltSize];
            RandomNumberGenerator.Fill(salt);

            var key = new Rfc2898DeriveBytes(newPassword, salt, Iterations, HashAlgorithmName.SHA256).GetBytes(KeySize);

            var hash = new byte[SaltSize + KeySize];
            Array.Copy(salt, 0, hash, 0, SaltSize);
            Array.Copy(key, 0, hash, SaltSize, KeySize);

            user.PasswordHash = Convert.ToBase64String(hash);
            _context.Users.Update(user);
            return true;
        }
    }
}