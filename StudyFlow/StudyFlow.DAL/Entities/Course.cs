namespace StudyFlow.DAL.Entities
{
    public class Course : EntityAuditBase
    {
        public Guid Id { get; set; }
        public Guid TeacherId { get; set; }
        public string? Name { get; set; }
        public string? Logo { get; set; }
        public bool IsEnabled { get; set; }
        public User Teacher { get; set; } = null!;
        public ICollection<Enrollment> ListEnrollment { get; set; } = new List<Enrollment>();
        public ICollection<Subject> ListSubject { get; set; } = new List<Subject>();
    }
}