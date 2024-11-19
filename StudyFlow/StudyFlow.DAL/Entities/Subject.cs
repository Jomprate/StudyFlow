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
        public string HtmlContent { get; set; }
        public List<string> YouTubeVideos { get; set; } = new List<string>();
        public List<string> GoogleDriveLinks { get; set; } = new List<string>();
        public List<string> AlternateLinks { get; set; } = new List<string>();
    }
}