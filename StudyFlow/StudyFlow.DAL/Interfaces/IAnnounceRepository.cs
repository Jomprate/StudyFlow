using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyFlow.DAL.Interfaces
{
    public interface IAnnounceRepository : IRepository<Announce>
    {
        Task<Announce> AddAnnounceAsync(Announce announce);

        Task<bool> DeleteAnnounceAsync(Guid id);

        Task<bool> UpdateAnnounceAsync(Announce announce);

        Task<IEnumerable<Announce>> GetAllAnnouncesAsync();

        Task<PaginationResult<Announce>> GetAnnouncesPagedByCourseIdAsync(Guid courseId, Pagination pagination);

        Task<PaginationResult<Announce>> GetAllAnnouncesAsync(Pagination pagination);

        Task<IEnumerable<Announce>> GetAnnouncesByUserIdAsync(Guid userId);

        Task<PaginationResult<Announce>> GetAnnouncesByUserIdAsync(Guid userId, Pagination pagination);

        Task<Announce?> GetAnnounceWithDetailsAsync(Guid id);

        Task<IEnumerable<Announce>> GetAllAnnouncesWithDetailsAsync();

        Task<PaginationResult<Announce>> GetAllAnnouncesWithDetailsAsync(Pagination pagination);
    }
}