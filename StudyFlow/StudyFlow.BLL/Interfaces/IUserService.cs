using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.User;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.BLL.Interfaces
{
    public interface IUserService
    {
        Task<IActionResult> GetAllUsersAsync();

        Task<IActionResult> GetUserByIdAsync(Guid id);

        Task<IActionResult> GetUserByCourseAsync(Guid courseId);

        Task<IActionResult> CreateUserAsync(AddUserDTO user);

        Task<IActionResult> UpdateUserAsync(UpdateUserDTO user);

        Task<IActionResult> DeleteUserAsync(Guid id);

        Task<IActionResult> ConfirmMailUserTokenAsync(Guid userId, string token);
    }
}