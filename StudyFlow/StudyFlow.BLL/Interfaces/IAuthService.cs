using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.Authenticate.Request;
using StudyFlow.BLL.DTOS.Entities;

namespace StudyFlow.BLL.Interfaces
{
    public interface IAuthService
    {
        Task<string> LoginAsync(LoginDTO loginDTO);

        Task<bool> LogoutAsync(string token);

        Task<IActionResult> RecoverPasswordByEmailAsync(RecoverPasswordRequestDTO recoverPasswordRequestDTO);

        Task<IActionResult> ResetPasswordAsync(ResetPasswordRequestDTO resetPasswordDTO);
    }
}