using Microsoft.AspNetCore.Identity;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.DAL.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> LoginAsync(string email, string password);

        Task<User> RegisterAsync(User user, string password);

        Task<User> GetUserByEmailAsync(string email);

        Task<string> GenerateEmailConfirmationTokenAsync(User user);

        Task<IdentityResult> ConfirmEmailAsync(User user, string token);
    }
}