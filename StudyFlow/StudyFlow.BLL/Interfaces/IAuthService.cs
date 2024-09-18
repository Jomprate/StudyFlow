using StudyFlow.BLL.DTOS.Entities;

namespace StudyFlow.BLL.Interfaces
{
    public interface IAuthService
    {
        Task<string> LoginAsync(LoginDTO loginDTO);

        Task<bool> LogoutAsync(string token);

        string RecoverPasswordByEmailAsync(Guid id);
    }
}