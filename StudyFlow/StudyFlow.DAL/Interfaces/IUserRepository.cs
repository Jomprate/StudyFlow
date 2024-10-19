using Microsoft.AspNetCore.Identity;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.DAL.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<SignInResult> LoginAsync(string email, string password);

        Task<User> RegisterAsync(User user, string password);

        Task<User> GetUserByEmailAsync(string email);

        Task<string> GenerateEmailConfirmationTokenAsync(User user);

        Task<IdentityResult> ConfirmEmailAsync(User user, string token);

        Task<bool> IsEmailConfirmedAsync(User user);

        Task<string> GeneratePasswordResetTokenAsync(User user);

        Task<IdentityResult> ResetPasswordAsync(User user, string token, string newPassword);
    }
}