namespace StudyFlow.DAL.Entities
{
    public class Course : EntityAuditBase
    {
        public Guid Id { get; set; }
        public Guid TeacherId { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public bool HaveLogo { get; set; }
        public bool IsEnabled { get; set; }
        public User Teacher { get; set; } = null!;

        public bool IsDeleted { get; set; } = false;
        public ICollection<Enrollment> ListEnrollment { get; set; } = new List<Enrollment>();
        public ICollection<Subject> ListSubject { get; set; } = new List<Subject>();
        public ICollection<Announce> Announces { get; set; } = new List<Announce>();
    }
}