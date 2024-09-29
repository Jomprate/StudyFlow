using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.BLL.DTOS.Announce
{
    public class GetAnnounceDTO
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = null!;

        public string HtmlContent { get; set; } = null!;

        public string? ProfilePicture { get; set; }

        public List<string>? YouTubeVideos { get; set; }

        public List<string>? GoogleDriveLinks { get; set; }

        public List<string>? AlternateLinks { get; set; }

        public string UserName { get; set; } = null!;
    }
}