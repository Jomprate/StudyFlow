using Microsoft.AspNetCore.Mvc;
using StudyFlow.DAL.Entities;

namespace StudyFlow.BLL.Interfaces
{
    public interface INotificationService
    {
        Task<IActionResult> GetNotificationsAsync();

        Task<IActionResult> GetNotificationByIdAsync(int id);

        Task<IActionResult> CreateNotificationAsync(Notification notification);

        Task<IActionResult> UpdateNotificationAsync(Notification notification);

        Task<IActionResult> DeleteNotificationAsync(int id);
    }
}