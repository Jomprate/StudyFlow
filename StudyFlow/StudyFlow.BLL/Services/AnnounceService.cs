using StudyFlow.BLL.DTOS.Announce;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Interfaces;
using StudyFlow.DAL.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudyFlow.BLL.Services
{
    public class AnnounceService : IAnnounceService
    {
        private readonly IAnnounceRepository _announceRepository;
        private IUnitOfWork _unitOfWork;

        public AnnounceService(IUnitOfWork unitOfWork, IAnnounceRepository announceRepository)
        {
            _unitOfWork = unitOfWork;
            _announceRepository = announceRepository;
        }

        public async Task<IEnumerable<GetAnnounceDTO>> GetAllAnnouncesAsync()
        {
            var announces = await _announceRepository.GetAllAnnouncesAsync();
            return announces.Select(a => MapToDTO(a));
        }

        public async Task<PaginationResult<GetAnnounceDTO>> GetAllAnnouncesAsync(Pagination pagination)
        {
            var announcesResult = await _announceRepository.GetAllAnnouncesAsync(pagination);
            return new PaginationResult<GetAnnounceDTO>
            {
                ListResult = announcesResult.ListResult.Select(a => MapToDTO(a)).ToList(),
                TotalRecords = announcesResult.TotalRecords,
                TotalPages = announcesResult.TotalPages,
                Pagination = announcesResult.Pagination
            };
        }

        public async Task<PaginationResult<GetAnnounceDTO>> GetAnnouncesByUserIdAsync(Guid userId, Pagination pagination)
        {
            var announcesResult = await _announceRepository.GetAnnouncesByUserIdAsync(userId, pagination);
            return new PaginationResult<GetAnnounceDTO>
            {
                ListResult = announcesResult.ListResult.Select(a => MapToDTO(a)).ToList(),
                TotalRecords = announcesResult.TotalRecords,
                TotalPages = announcesResult.TotalPages,
                Pagination = announcesResult.Pagination
            };
        }

        public async Task<GetAnnounceDTO> GetAnnounceWithDetailsAsync(Guid id)
        {
            var announce = await _announceRepository.GetAnnounceWithDetailsAsync(id);
            if (announce == null)
                throw new KeyNotFoundException("Announce not found");

            return MapToDTO(announce);
        }

        public async Task<IEnumerable<GetAnnounceDTO>> GetAnnouncesWithYouTubeVideosAsync()
        {
            var announces = await _announceRepository.GetAnnouncesWithYouTubeVideosAsync();
            return announces.Select(a => MapToDTO(a));
        }

        public async Task<IEnumerable<GetAnnounceDTO>> GetAnnouncesWithGoogleDriveLinksAsync()
        {
            var announces = await _announceRepository.GetAnnouncesWithGoogleDriveLinksAsync();
            return announces.Select(a => MapToDTO(a));
        }

        public async Task<Guid> CreateAnnounceAsync(AddAnnounceDTO announceDTO)
        {
            var announce = new Announce
            {
                Title = announceDTO.Title,
                HtmlContent = announceDTO.HtmlContent,
                YouTubeVideos = announceDTO.YouTubeVideos ?? new List<string>(),
                GoogleDriveLinks = announceDTO.GoogleDriveLinks ?? new List<string>(),
                AlternateLinks = announceDTO.AlternateLinks ?? new List<string>(),
                UserId = announceDTO.UserId,
                CourseId = announceDTO.CourseId
            };

            await _announceRepository.AddAsync(announce);
            await _unitOfWork.SaveChangesAsync();

            return announce.Id;
        }

        public async Task<bool> UpdateAnnounceAsync(Guid id, AddAnnounceDTO announceDTO)
        {
            var announce = await _announceRepository.GetByIdAsync(id);
            if (announce == null) return false;

            announce.Title = announceDTO.Title;
            announce.HtmlContent = announceDTO.HtmlContent;
            announce.YouTubeVideos = announceDTO.YouTubeVideos ?? new List<string>();
            announce.GoogleDriveLinks = announceDTO.GoogleDriveLinks ?? new List<string>();
            announce.AlternateLinks = announceDTO.AlternateLinks ?? new List<string>();
            announce.CourseId = announceDTO.CourseId;

            _announceRepository.Update(announce);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAnnounceAsync(Guid id)
        {
            var announce = await _announceRepository.GetByIdAsync(id);
            if (announce == null) return false;

            _announceRepository.Delete(announce);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<GetAnnounceDTO>> GetAnnouncesByCourseIdAsync(Guid courseId)
        {
            var announces = await _announceRepository.GetAnnouncesByCourseIdAsync(courseId);
            return announces.Select(a => MapToDTO(a));
        }

        public async Task<PaginationResult<GetAnnounceDTO>> GetAnnouncesByCourseIdAsync(Guid courseId, Pagination pagination)
        {
            var announcesResult = await _announceRepository.GetAnnouncesByCourseIdAsync(courseId, pagination);
            return new PaginationResult<GetAnnounceDTO>
            {
                ListResult = announcesResult.ListResult.Select(a => MapToDTO(a)).ToList(),
                TotalRecords = announcesResult.TotalRecords,
                TotalPages = announcesResult.TotalPages,
                Pagination = announcesResult.Pagination
            };
        }

        private GetAnnounceDTO MapToDTO(Announce announce)
        {
            return new GetAnnounceDTO
            {
                Id = announce.Id,
                Title = announce.Title,
                HtmlContent = announce.HtmlContent,
                ProfilePicture = announce.User?.HaveProfilePicture == true ? announce.User.ProfilePicture : null,
                YouTubeVideos = announce.YouTubeVideos,
                GoogleDriveLinks = announce.GoogleDriveLinks,
                AlternateLinks = announce.AlternateLinks,
                UserName = announce.User != null ? $"{announce.User.FirstName} {announce.User.LastName}" : "Unknown User"
            };
        }
    }
}