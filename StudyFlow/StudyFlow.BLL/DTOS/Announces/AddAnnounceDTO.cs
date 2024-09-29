using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StudyFlow.BLL.DTOS.Announce
{
    public class AddAnnounceDTO
    {
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; } = null!;

        public string HtmlContent { get; set; } = null!;

        public Guid UserId { get; set; }

        public Guid CourseId { get; set; }

        public List<string> YouTubeVideos { get; set; } = new List<string>();

        public List<string> GoogleDriveLinks { get; set; } = new List<string>();

        public List<string> AlternateLinks { get; set; } = new List<string>();
    }
}