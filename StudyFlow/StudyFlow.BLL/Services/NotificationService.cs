using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IRepository<Notification> _repository;

        public NotificationService(IRepository<Notification> repository)
        {
            _repository = repository;
        }

        public async Task<IActionResult> CreateNotificationAsync(Notification notification)
        {
            if (notification == null)
            {
                return new BadRequestObjectResult("Notification data is required.");
            }

            var result = await _repository.CreateAsync(notification);

            return new CreatedResult("", result);
        }

        public async Task<IActionResult> DeleteNotificationAsync(int id)
        {
            if (id <= 0)
            {
                return new BadRequestObjectResult(new { Error = "The Id cannot be 0 or null." });
            }

            var notification = await _repository.GetByIdAsync(id);

            if (notification == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found notification with the Id {id}." });
            }

            var result = await _repository.DeleteAsync(notification);

            if (result)
            {
                return new OkObjectResult(new { Message = "Notification deleted successfully" });
            }
            else
            {
                return new BadRequestObjectResult(new { Message = "Failed to delete notification" });
            }
        }

        public async Task<IActionResult> GetNotificationsAsync()
        {
            var notifications = await _repository.GetAllAsync();
            if (!notifications.Any())
            {
                return new NotFoundObjectResult("No notifications found.");
            }
            return new OkObjectResult(notifications);
        }

        public async Task<IActionResult> GetNotificationByIdAsync(int id)
        {
            var notification = await _repository.GetByIdAsync(id);
            if (notification == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found notification with the Id {id}." });
            }
            return new OkObjectResult(notification);
        }

        //public async Task<IActionResult> GetnotificationByUserIDAsync(User user)
        //{
        //    var notification = await _repository.FindAsync(i => i.UserID == user.Id);
        //    if (!notification.Any())
        //    {
        //        return new NotFoundObjectResult("No notification found in the specified user.");
        //    }
        //    return new OkObjectResult(notification);
        //}

        public async Task<IActionResult> UpdateNotificationAsync(Notification notification)
        {
            var currentNotification = await _repository.GetByIdAsync(notification.Id);
            if (currentNotification == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found notification with the Id {notification.Id}." });
            }

            // Actualizar los datos de la institución
            currentNotification.Message = notification.Message;
            var result = await _repository.UpdateAsync(currentNotification);

            return new OkObjectResult(result);
        }
    }
}