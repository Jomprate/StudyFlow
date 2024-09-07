using StudyFlow.DAL.Enumeration;

namespace StudyFlow.DAL.Entities;

public class Notification : EntityAuditBase
{
    public Guid Id { get; set; }
    public Guid? CourseId { get; set; }
    public Guid? UserId { get; set; }
    public string Message { get; set; } = null!;
    public NotificationStateEnum State { get; set; }

    public Course Course { get; set; } = null!;
    public User User { get; set; } = null!;
}