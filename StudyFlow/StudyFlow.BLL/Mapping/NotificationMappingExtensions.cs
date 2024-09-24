using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Enumeration;

namespace StudyFlow.BLL.Mapping
{
    internal static class NotificationMappingExtensions
    {
        internal static DAL.Entities.Notification ToEntity(this NotificationDTO dto)
        {
            return new DAL.Entities.Notification
            {
                Message = dto.Message,
                State = dto.State,
                CourseId = dto.CourseId,
                UserId = dto.UserId,
            };
        }

        internal static NotificationDTO ToDTO(this DAL.Entities.Notification entity)
        {
            return new NotificationDTO
            {
                Id = entity.Id,
                Message = entity.Message,
                State = entity.State,
                CourseId = entity.CourseId,
                UserId = entity.UserId
            };
        }
    }
}