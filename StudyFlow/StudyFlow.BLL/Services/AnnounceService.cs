using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.Announce;
using StudyFlow.BLL.DTOS.ApiResponse;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudyFlow.BLL.Services
{
    public class AnnounceService : IAnnounceService
    {
        private readonly IAnnounceRepository _announceRepository;
        private readonly IUnitOfWork _unitOfWork;

        public AnnounceService(IAnnounceRepository announceRepository, IUnitOfWork unitOfWork)
        {
            _announceRepository = announceRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IActionResult> GetAllAnnouncesAsync(Pagination pagination)
        {
            if (pagination == null)
            {
                return ApiResponseHelper.BadRequest("Pagination data is required.");
            }

            var announcesResult = await _announceRepository.GetAllAnnouncesAsync(pagination);
            announcesResult.ListResult = announcesResult.ListResult
                .Where(a => !a.IsDeleted)
                .ToList();

            if (!announcesResult.ListResult.Any())
            {
                return ApiResponseHelper.NotFound("No announces found.");
            }

            return ApiResponseHelper.Success(new PaginationResult<GetAnnounceDTO>
            {
                ListResult = announcesResult.ListResult.Select(a => MapToDTO(a)).ToList(),
                TotalRecords = announcesResult.TotalRecords,
                TotalPages = announcesResult.TotalPages,
                Pagination = announcesResult.Pagination
            });
        }

        public async Task<IActionResult> GetAllAnnouncesAsync()
        {
            var announces = await _announceRepository.GetAllAnnouncesAsync();
            var filteredAnnounces = announces
                .Where(a => !a.IsDeleted)
                .Select(a => MapToDTO(a));

            if (!filteredAnnounces.Any())
            {
                return ApiResponseHelper.NotFound("No announces found.");
            }

            return ApiResponseHelper.Success(filteredAnnounces);
        }

        public async Task<IActionResult> GetAllAnnouncesWithDetailsAsync()
        {
            var announces = await _announceRepository.GetAllAnnouncesWithDetailsAsync();
            var filteredAnnounces = announces
                .Where(a => !a.IsDeleted)
                .Select(a => MapToDTO(a));

            if (!filteredAnnounces.Any())
            {
                return ApiResponseHelper.NotFound("No announces found with details.");
            }

            return ApiResponseHelper.Success(filteredAnnounces);
        }

        public async Task<IActionResult> GetAllAnnouncesWithDetailsAsync(Pagination pagination)
        {
            if (pagination == null)
            {
                return ApiResponseHelper.BadRequest("Pagination data is required.");
            }

            var announcesResult = await _announceRepository.GetAllAnnouncesWithDetailsAsync(pagination);
            announcesResult.ListResult = announcesResult.ListResult
                .Where(a => !a.IsDeleted)
                .ToList();

            if (!announcesResult.ListResult.Any())
            {
                return ApiResponseHelper.NotFound("No announces found with details.");
            }

            return ApiResponseHelper.Success(new PaginationResult<GetAnnounceDTO>
            {
                ListResult = announcesResult.ListResult.Select(a => MapToDTO(a)).ToList(),
                TotalRecords = announcesResult.TotalRecords,
                TotalPages = announcesResult.TotalPages,
                Pagination = announcesResult.Pagination
            });
        }

        public async Task<IActionResult> GetAnnouncesByUserIdAsync(Guid userId, Pagination pagination)
        {
            if (userId == Guid.Empty)
            {
                return ApiResponseHelper.BadRequest("UserId is required.");
            }

            var userExists = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == userId);
            if (!userExists)
            {
                return ApiResponseHelper.NotFound($"User with Id {userId} not found.");
            }

            if (pagination == null)
            {
                return ApiResponseHelper.BadRequest("Pagination data is required.");
            }

            var announcesResult = await _announceRepository.GetAnnouncesByUserIdAsync(userId, pagination);
            announcesResult.ListResult = announcesResult.ListResult
                .Where(a => !a.IsDeleted)
                .ToList();

            if (!announcesResult.ListResult.Any())
            {
                return ApiResponseHelper.NotFound("No announces found for the specified user.");
            }

            return ApiResponseHelper.Success(new PaginationResult<GetAnnounceDTO>
            {
                ListResult = announcesResult.ListResult.Select(a => MapToDTO(a)).ToList(),
                TotalRecords = announcesResult.TotalRecords,
                TotalPages = announcesResult.TotalPages,
                Pagination = announcesResult.Pagination
            });
        }

        public async Task<IActionResult> GetAnnounceWithDetailsAsync(Guid id)
        {
            if (id == Guid.Empty)
            {
                return ApiResponseHelper.BadRequest("Announce Id is required.");
            }

            var announce = await _announceRepository.GetAnnounceWithDetailsAsync(id);
            if (announce == null || announce.IsDeleted)
            {
                return ApiResponseHelper.NotFound("Announce not found.");
            }

            return ApiResponseHelper.Success(MapToDTO(announce));
        }

        public async Task<IActionResult> CreateAnnounceAsync(AddAnnounceDTO announceDTO)
        {
            if (announceDTO == null)
            {
                return ApiResponseHelper.BadRequest("Announce data is required.");
            }

            if (string.IsNullOrWhiteSpace(announceDTO.Title))
            {
                return ApiResponseHelper.BadRequest("Title cannot be empty.");
            }

            if (string.IsNullOrWhiteSpace(announceDTO.HtmlContent))
            {
                return ApiResponseHelper.BadRequest("HtmlContent cannot be empty.");
            }

            if (announceDTO.UserId == Guid.Empty)
            {
                return ApiResponseHelper.BadRequest("UserId is required.");
            }

            var userExists = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == announceDTO.UserId);
            if (!userExists)
            {
                return ApiResponseHelper.NotFound($"User with Id {announceDTO.UserId} not found.");
            }

            announceDTO.YouTubeVideos ??= new List<string>();
            announceDTO.GoogleDriveLinks ??= new List<string>();
            announceDTO.AlternateLinks ??= new List<string>();

            var announce = new Announce
            {
                Title = announceDTO.Title,
                HtmlContent = announceDTO.HtmlContent,
                YouTubeVideos = announceDTO.YouTubeVideos,
                GoogleDriveLinks = announceDTO.GoogleDriveLinks,
                AlternateLinks = announceDTO.AlternateLinks,
                UserId = announceDTO.UserId,
                CourseId = announceDTO.CourseId
            };

            try
            {
                await _announceRepository.AddAnnounceAsync(announce);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return ApiResponseHelper.InternalServerError("Failed to create announce.", ex.Message);
            }

            return ApiResponseHelper.Create(announce.Id);
        }

        public async Task<IActionResult> UpdateAnnounceAsync(Guid id, AddAnnounceDTO announceDTO)
        {
            if (id == Guid.Empty)
            {
                return ApiResponseHelper.BadRequest("Announce Id is required.");
            }

            if (announceDTO == null)
            {
                return ApiResponseHelper.BadRequest("Announce data is required.");
            }

            if (string.IsNullOrWhiteSpace(announceDTO.Title))
            {
                return ApiResponseHelper.BadRequest("Title cannot be empty.");
            }

            if (string.IsNullOrWhiteSpace(announceDTO.HtmlContent))
            {
                return ApiResponseHelper.BadRequest("HtmlContent cannot be empty.");
            }

            if (announceDTO.UserId == Guid.Empty)
            {
                return ApiResponseHelper.BadRequest("UserId is required.");
            }

            var userExists = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == announceDTO.UserId);
            if (!userExists)
            {
                return ApiResponseHelper.NotFound($"User with Id {announceDTO.UserId} not found.");
            }

            var existingAnnounce = await _announceRepository.GetAnnounceWithDetailsAsync(id);
            if (existingAnnounce == null || existingAnnounce.IsDeleted)
            {
                return ApiResponseHelper.NotFound("Announce not found.");
            }

            announceDTO.YouTubeVideos ??= new List<string>();
            announceDTO.GoogleDriveLinks ??= new List<string>();
            announceDTO.AlternateLinks ??= new List<string>();

            existingAnnounce.Title = announceDTO.Title;
            existingAnnounce.HtmlContent = announceDTO.HtmlContent;
            existingAnnounce.YouTubeVideos = announceDTO.YouTubeVideos;
            existingAnnounce.GoogleDriveLinks = announceDTO.GoogleDriveLinks;
            existingAnnounce.AlternateLinks = announceDTO.AlternateLinks;
            existingAnnounce.UserId = announceDTO.UserId;
            existingAnnounce.CourseId = announceDTO.CourseId;

            try
            {
                await _announceRepository.UpdateAnnounceAsync(existingAnnounce);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return ApiResponseHelper.InternalServerError("Failed to update announce.", ex.Message);
            }

            return ApiResponseHelper.NoContent();
        }

        public async Task<IActionResult> DeleteAnnounceAsync(Guid id)
        {
            if (id == Guid.Empty)
            {
                return ApiResponseHelper.BadRequest("Announce Id is required.");
            }

            var announce = await _announceRepository.GetAnnounceWithDetailsAsync(id);
            if (announce == null || announce.IsDeleted)
            {
                return ApiResponseHelper.NotFound("Announce not found.");
            }

            announce.IsDeleted = true;

            try
            {
                await _announceRepository.UpdateAnnounceAsync(announce);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return ApiResponseHelper.InternalServerError("Failed to delete announce.", ex.Message);
            }

            return ApiResponseHelper.NoContent();
        }

        public async Task<IActionResult> GetAnnouncesByCourseIdAsync(Guid courseId)
        {
            if (courseId == Guid.Empty)
            {
                return ApiResponseHelper.BadRequest("Course Id is required.");
            }

            var announces = await _announceRepository.GetAnnouncesByCourseIdAsync(courseId);
            var filteredAnnounces = announces
                .Where(a => !a.IsDeleted)
                .Select(a => MapToDTO(a));

            if (!filteredAnnounces.Any())
            {
                return ApiResponseHelper.NotFound("No announces found for the specified course.");
            }

            return ApiResponseHelper.Success(filteredAnnounces);
        }

        public async Task<IActionResult> GetAnnouncesByCourseIdAsync(Guid courseId, Pagination pagination)
        {
            if (courseId == Guid.Empty)
            {
                return ApiResponseHelper.BadRequest("Course Id is required.");
            }

            if (pagination == null)
            {
                return ApiResponseHelper.BadRequest("Pagination data is required.");
            }

            var announcesResult = await _announceRepository.GetAnnouncesByCourseIdAsync(courseId, pagination);
            announcesResult.ListResult = announcesResult.ListResult
                .Where(a => !a.IsDeleted)
                .ToList();

            if (!announcesResult.ListResult.Any())
            {
                return ApiResponseHelper.NotFound("No announces found for the specified course.");
            }

            return ApiResponseHelper.Success(new PaginationResult<GetAnnounceDTO>
            {
                ListResult = announcesResult.ListResult.Select(a => MapToDTO(a)).ToList(),
                TotalRecords = announcesResult.TotalRecords,
                TotalPages = announcesResult.TotalPages,
                Pagination = announcesResult.Pagination
            });
        }

        private GetAnnounceDTO MapToDTO(Announce announce)
        {
            return new GetAnnounceDTO
            {
                Id = announce.Id,
                Title = announce.Title,
                HtmlContent = announce.HtmlContent,
                YouTubeVideos = announce.YouTubeVideos,
                GoogleDriveLinks = announce.GoogleDriveLinks,
                AlternateLinks = announce.AlternateLinks,
                UserName = announce.User != null ? $"{announce.User.FirstName} {announce.User.LastName}" : "Unknown User",
            };
        }
    }
}