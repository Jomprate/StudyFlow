using System;
using System.Collections.Generic;

namespace StudyFlow.BLL.DTOS.Announce
{
    public class GetAnnounceDTO
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = null!;

        public string HtmlContent { get; set; } = null!;

        public string? ProfilePicture { get; set; }
        public Guid UserId { get; set; }

        public List<string> YouTubeVideos { get; set; } = new List<string>();

        public List<string> GoogleDriveLinks { get; set; } = new List<string>();

        public List<string> AlternateLinks { get; set; } = new List<string>();

        public string UserName { get; set; } = null!;

        public DateTime CreationDate { get; set; }

        public DateTime LastModificationDate { get; set; }
    }
}