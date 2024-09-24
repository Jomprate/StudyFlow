using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.ApiResponse;
using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.BLL.DTOS.OnBoardingTeacher;
using StudyFlow.BLL.DTOS.OnBoardingTeacher.Request;
using StudyFlow.BLL.Interfaces;
using StudyFlow.BLL.Mapping;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Enumeration;
using StudyFlow.DAL.Interfaces;
using StudyFlow.Infrastructure.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class NotificationService : INotificationService
    {
        private IUnitOfWork _unitOfWork;

        public NotificationService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IActionResult> CreateNotificationAsync(NotificationDTO notification)
        {
            var course = await _unitOfWork.CourseRepository.AnyAsync(w => w.Id == notification.CourseId);

            if (!course)
            {
                return ApiResponseHelper.NotFound($"Course with Id {notification.CourseId} not found.");
            }

            Notification createNotification = notification.ToEntity();

            try
            {
                await _unitOfWork.NotificationRepository.CreateAsync(createNotification);

                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new Exception("Failed to add subject to course", ex);
            }

            return ApiResponseHelper.Create(true);
        }

        public async Task<IActionResult> DeleteNotificationAsync(Guid id)
        {
            var notification = await _unitOfWork.NotificationRepository.GetByIdAsync(id);

            if (notification is null)
            {
                return ApiResponseHelper.NotFound($"Subject with Id {id} not found.");
            }

            bool result = await _unitOfWork.NotificationRepository.DeleteAsync(notification);

            try
            {
                if (result)
                {
                    await _unitOfWork.SaveChangesAsync();
                    return ApiResponseHelper.NoContent();
                }

                throw new ArgumentException("Failed to delete subject");
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new Exception("Failed to delete subject", ex);
            }
        }

        public async Task<IActionResult> GetNotificationsAsync()
        {
            var notifications = await _unitOfWork.NotificationRepository.GetAllAsync();
            if (!notifications.Any())
            {
                return ApiResponseHelper.NotFound($"Notifications not found.");
            }
            return ApiResponseHelper.Success(notifications);
        }

        public async Task<IActionResult> GetNotificationByIdAsync(Guid id)
        {
            var notification = await _unitOfWork.NotificationRepository.GetByIdAsync(id);

            if (notification == null)
            {
                return ApiResponseHelper.NotFound($"Notification with Id {id} not found.");
            }

            var notificationDto = notification.ToDTO();

            return ApiResponseHelper.Success(notificationDto);
        }

        public async Task<IActionResult> UpdateNotificationAsync(NotificationDTO notification)
        {
            if (notification.Id.Equals(""))
            {
                return ApiResponseHelper.BadRequest("notificationId is required.");
            }

            var currentNotification = await _unitOfWork.NotificationRepository.GetByIdAsync(notification.Id);

            if (currentNotification is null)
            {
                return ApiResponseHelper.NotFound($"Subject with Id {notification.Id} not found.");
            }

            currentNotification.Message = notification.Message;
            currentNotification.State = notification.State;

            bool result = await _unitOfWork.NotificationRepository.UpdateAsync(currentNotification);

            try
            {
                await _unitOfWork.SaveChangesAsync();
                return ApiResponseHelper.NoContent();
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new Exception("Failed to update subject", ex);
            }
        }
    }
}