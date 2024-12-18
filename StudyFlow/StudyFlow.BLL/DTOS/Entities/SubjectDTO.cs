﻿namespace StudyFlow.BLL.DTOS.Entities
{
    public class SubjectDTO
    {
        public Guid? Id { get; set; }
        public CourseDTO? Course { get; set; }
        public string? Name { get; set; } = null!;
        public string HtmlContent { get; set; } = null!;
        public string? Type { get; set; } = null!;
        public string? Link { get; set; }

        public List<ScheduledDTO> ListScheduleds { get; set; } = new List<ScheduledDTO>();

        public List<string> YouTubeVideos { get; set; } = new List<string>();
        public List<string> GoogleDriveLinks { get; set; } = new List<string>();
        public List<string> AlternateLinks { get; set; } = new List<string>();
        public DateTime CreationDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}