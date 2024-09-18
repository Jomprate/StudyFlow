using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.User;

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
    }
}