using StudyFlow.DAL.Enumeration;

namespace StudyFlow.DAL.Entities
{
    public class Subject : EntityAuditBase
    {
        public Guid Id { get; set; }
        public Guid CourseId { get; set; }
        public string Name { get; set; } = null!;
        public SubjectTypeEnum Type { get; set; }
        public string? Link { get; set; }

        public Course Course { get; set; } = null!;
        public ICollection<Scheduled> ListScheduled { get; set; } = new List<Scheduled>();
    }
}