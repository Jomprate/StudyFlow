using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Enumeration;

namespace StudyFlow.BLL.DTOS.Entities
{
    public class NotificationDTO
    {
        public Guid Id { get; set; }
        public Guid? CourseId { get; set; }
        public Guid? UserId { get; set; }
        public string Message { get; set; } = null!;
        public NotificationStateEnum State { get; set; }

        public CourseDTO Course { get; set; } = null!;
    }
}
