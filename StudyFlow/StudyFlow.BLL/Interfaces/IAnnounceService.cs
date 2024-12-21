using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.Announce;
using StudyFlow.DAL.Entities.Helper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyFlow.BLL.Interfaces
{
    public interface IAnnounceService
    {
        Task<IActionResult> GetAllAnnouncesAsync(Pagination pagination);

        Task<IActionResult> GetAllAnnouncesAsync();

        Task<IActionResult> GetAnnouncesByUserIdAsync(Guid userId, Pagination pagination);

        Task<IActionResult> GetAnnounceWithDetailsAsync(Guid id);

        Task<IActionResult> CreateAnnounceAsync(AddAnnounceDTO announceDTO);

        Task<IActionResult> UpdateAnnounceAsync(Guid id, AddAnnounceDTO announceDTO);

        Task<IActionResult> DeleteAnnounceAsync(Guid id);

        Task<IActionResult> GetAnnouncesByCourseIdAsync(Guid courseId);

        Task<IActionResult> GetAnnouncesByCourseIdAsync(Guid courseId, Pagination pagination);

        Task<IActionResult> GetAllAnnouncesWithDetailsAsync();

        Task<IActionResult> GetAllAnnouncesWithDetailsAsync(Pagination pagination);

        Task<IActionResult> GetAnnouncesPagedByCourseIdAsync(Guid courseId, Pagination pagination);
    }
}