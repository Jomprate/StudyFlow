using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Entities;

namespace StudyFlow.BLL.Interfaces
{
    public interface INotificationService
    {
        Task<IActionResult> GetNotificationsAsync();

        Task<IActionResult> GetNotificationByIdAsync(Guid id);

        Task<IActionResult> CreateNotificationAsync(NotificationDTO notification);

        Task<IActionResult> UpdateNotificationAsync(NotificationDTO notification);

        Task<IActionResult> DeleteNotificationAsync(Guid id);
    }
}