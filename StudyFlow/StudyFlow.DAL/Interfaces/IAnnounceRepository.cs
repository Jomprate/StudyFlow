using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyFlow.DAL.Interfaces
{
    public interface IAnnounceRepository : IRepository<Announce>
    {
        Task<PaginationResult<Announce>> GetAllAnnouncesAsync(Pagination pagination);

        Task<IEnumerable<Announce>> GetAllAnnouncesAsync();

        Task<IEnumerable<Announce>> GetAnnouncesByUserIdAsync(Guid userId);

        Task<PaginationResult<Announce>> GetAnnouncesByUserIdAsync(Guid userId, Pagination pagination);

        Task<Announce?> GetAnnounceWithDetailsAsync(Guid id);

        Task<IEnumerable<Announce>> GetAnnouncesWithYouTubeVideosAsync();

        Task<IEnumerable<Announce>> GetAnnouncesWithGoogleDriveLinksAsync();

        Task<IEnumerable<Announce>> GetAnnouncesByCourseIdAsync(Guid courseId);

        Task<PaginationResult<Announce>> GetAnnouncesByCourseIdAsync(Guid courseId, Pagination pagination);
    }
}