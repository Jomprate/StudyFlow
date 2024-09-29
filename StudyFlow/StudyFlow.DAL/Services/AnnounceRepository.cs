using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudyFlow.DAL.Services
{
    public class AnnounceRepository : Repository<Announce>, IAnnounceRepository
    {
        private readonly DataContext _context;

        public AnnounceRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Announce>> GetAllAnnouncesAsync()
        {
            return await _context.Announces
                .AsNoTracking()
                .Include(a => a.User)
                .Include(a => a.Course)
                .ToListAsync();
        }

        public async Task<PaginationResult<Announce>> GetAllAnnouncesAsync(Pagination pagination)
        {
            var query = _context.Announces
                .AsNoTracking()
                .Include(a => a.User)
                .Include(a => a.Course)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Filter))
            {
                query = query.Where(a => a.Title.Contains(pagination.Filter, StringComparison.OrdinalIgnoreCase));
            }

            int totalRecords = await query.CountAsync();
            var items = await query
                .Skip((pagination.Page - 1) * pagination.RecordsNumber)
                .Take(pagination.RecordsNumber)
                .ToListAsync();

            return new PaginationResult<Announce>
            {
                ListResult = items,
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<IEnumerable<Announce>> GetAnnouncesByUserIdAsync(Guid userId)
        {
            return await _context.Announces
                .AsNoTracking()
                .Where(a => a.UserId == userId)
                .Include(a => a.Course)
                .ToListAsync();
        }

        public async Task<PaginationResult<Announce>> GetAnnouncesByUserIdAsync(Guid userId, Pagination pagination)
        {
            var query = _context.Announces
                .AsNoTracking()
                .Where(a => a.UserId == userId)
                .Include(a => a.Course)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Filter))
            {
                query = query.Where(a => a.Title.Contains(pagination.Filter, StringComparison.OrdinalIgnoreCase));
            }

            int totalRecords = await query.CountAsync();
            var items = await query
                .Skip((pagination.Page - 1) * pagination.RecordsNumber)
                .Take(pagination.RecordsNumber)
                .ToListAsync();

            return new PaginationResult<Announce>
            {
                ListResult = items,
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<Announce?> GetAnnounceWithDetailsAsync(Guid id)
        {
            return await _context.Announces
                .AsNoTracking()
                .Include(a => a.User)
                .Include(a => a.Course)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<Announce>> GetAnnouncesWithYouTubeVideosAsync()
        {
            return await _context.Announces
                .AsNoTracking()
                .Where(a => a.YouTubeVideos != null && a.YouTubeVideos.Any())
                .Include(a => a.Course)
                .ToListAsync();
        }

        public async Task<IEnumerable<Announce>> GetAnnouncesWithGoogleDriveLinksAsync()
        {
            return await _context.Announces
                .AsNoTracking()
                .Where(a => a.GoogleDriveLinks != null && a.GoogleDriveLinks.Any())
                .Include(a => a.Course)
                .ToListAsync();
        }

        public async Task<IEnumerable<Announce>> GetAnnouncesByCourseIdAsync(Guid courseId)
        {
            return await _context.Announces
                .AsNoTracking()
                .Where(a => a.CourseId == courseId)
                .Include(a => a.User)
                .ToListAsync();
        }

        public async Task<PaginationResult<Announce>> GetAnnouncesByCourseIdAsync(Guid courseId, Pagination pagination)
        {
            var query = _context.Announces
                .AsNoTracking()
                .Where(a => a.CourseId == courseId)
                .Include(a => a.User)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Filter))
            {
                query = query.Where(a => a.Title.Contains(pagination.Filter, StringComparison.OrdinalIgnoreCase));
            }

            int totalRecords = await query.CountAsync();
            var items = await query
                .Skip((pagination.Page - 1) * pagination.RecordsNumber)
                .Take(pagination.RecordsNumber)
                .ToListAsync();

            return new PaginationResult<Announce>
            {
                ListResult = items,
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }
    }
}