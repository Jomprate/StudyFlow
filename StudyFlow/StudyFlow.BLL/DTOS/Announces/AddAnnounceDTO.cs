using System.ComponentModel.DataAnnotations;

namespace StudyFlow.BLL.DTOS.Announce
{
    public class AddAnnounceDTO
    {
        [Required]
        public string Title { get; set; } = null!;

        [Required]
        public string HtmlContent { get; set; } = null!;

        public List<string>? YouTubeVideos { get; set; }

        public List<string>? GoogleDriveLinks { get; set; }

        public List<string>? AlternateLinks { get; set; }

        public Guid UserId { get; set; } // Se establece automáticamente basado en el usuario autenticado
    }
}