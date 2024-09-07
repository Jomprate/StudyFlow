namespace StudyFlow.DAL.Entities
{
    public class Course : EntityAuditBase
    {
        public Guid Id { get; set; }
        public Guid TeacherId { get; set; }
        public string? Name { get; set; }
        public string? Logo { get; set; }
        public bool IsEnabled { get; set; }
        public User Teacher { get; set; }
        public ICollection<Enrollment> ListEnrollment { get; set; }
        public ICollection<Subject> ListSubject { get; set; }
        public ICollection<Scheduled> ListScheduled { get; set; }
    }
}