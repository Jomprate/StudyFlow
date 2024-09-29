using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudyFlow.DAL.Entities
{
    public class Announce
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; } = null!;

        [Required]
        public string HtmlContent { get; set; } = null!;

        public string? ProfilePicture { get; set; }

        public List<string> YouTubeVideos { get; set; } = new List<string>();

        public List<string> GoogleDriveLinks { get; set; } = new List<string>();

        public List<string> AlternateLinks { get; set; } = new List<string>();

        [Required]
        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }

        public User User { get; set; } = null!;

        // Nueva relación con la entidad Course
        [Required]
        [ForeignKey(nameof(Course))]
        public Guid CourseId { get; set; }

        public Course Course { get; set; } = null!;
    }
}