using Microsoft.AspNetCore.Mvc;
using StudyFlow.DAL.Entities;

namespace StudyFlow.BLL.Interfaces
{
    public interface IUserService
    {
        Task<IActionResult> GetAllUsersAsync();

        Task<IActionResult> GetUserByIdAsync(Guid id);

        Task<IActionResult> GetUserByInstitutionAsync(int institutionId);

        Task<IActionResult> GetUserByCourseAsync(int courseId);

        Task<IActionResult> CreateUserAsync(User user);

        Task<IActionResult> UpdateUserAsync(User user);

        Task<IActionResult> DeleteUserAsync(Guid id);
    }
}