using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Interfaces;
using StudyFlow.DAL.Services;

namespace StudyFlow.DAL.Repositories
{
    public class AnnounceRepository : Repository<Announce>, IAnnounceRepository
    {
        private readonly DataContext _context;

        public AnnounceRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Announce> AddAnnounceAsync(Announce announce)
        {
            //await _context.Set<Announce>().AddAsync(announce);
            await CreateAsync(announce);
            return announce;
        }

        public async Task<bool> DeleteAnnounceAsync(Guid id)
        {
            var announce = await _context.Set<Announce>().FindAsync(id);
            if (announce == null)
            {
                return false;
            }

            announce.IsDeleted = true;
            await UpdateAsync(announce);
            //_context.Set<Announce>().Update(announce);
            return true;
        }

        public async Task<bool> UpdateAnnounceAsync(Announce announce)
        {
            var existingAnnounce = await _context.Set<Announce>().AsNoTracking().FirstOrDefaultAsync(w => w.Id == announce.Id);
            if (existingAnnounce == null || existingAnnounce.IsDeleted)
            {
                return false;
            }

            await UpdateAsync(announce);
            return true;
        }

        public async Task<IEnumerable<Announce>> GetAllAnnouncesAsync()
        {
            return await _context.Set<Announce>()
                .AsNoTracking()
                .Where(a => !a.IsDeleted)
                .Include(a => a.User)
                .Include(a => a.Course)
                .ToListAsync();
        }

        public async Task<PaginationResult<Announce>> GetAllAnnouncesAsync(Pagination pagination)
        {
            var query = _context.Set<Announce>()
                .AsNoTracking()
                .Where(a => !a.IsDeleted)
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
            return await _context.Set<Announce>()
                .AsNoTracking()
                .Where(a => !a.IsDeleted && a.UserId == userId)
                .Include(a => a.Course)
                .ToListAsync();
        }

        public async Task<PaginationResult<Announce>> GetAnnouncesByUserIdAsync(Guid userId, Pagination pagination)
        {
            var query = _context.Set<Announce>()
                .AsNoTracking()
                .Where(a => !a.IsDeleted && a.UserId == userId)
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
            return await _context.Set<Announce>()
                .AsNoTracking()
                .Where(a => !a.IsDeleted)
                .Include(a => a.User)
                .Include(a => a.Course)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<PaginationResult<Announce>> GetAnnouncesPagedByCourseIdAsync(Guid courseId, Pagination pagination)
        {
            if (pagination == null)
            {
                throw new ArgumentNullException(nameof(pagination), "Pagination data is required.");
            }

            var query = _context.Set<Announce>()
                .AsNoTracking()
                .Where(a => !a.IsDeleted && a.CourseId == courseId)
                .Include(a => a.User)
                .Include(a => a.Course)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Filter))
            {
                query = query.Where(a => a.Title.Contains(pagination.Filter, StringComparison.OrdinalIgnoreCase));
            }

            query = query.OrderByDescending(a => a.UpdatedAt);

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

        public async Task<IEnumerable<Announce>> GetAllAnnouncesWithDetailsAsync()
        {
            return await _context.Set<Announce>()
                .AsNoTracking()
                .Where(a => !a.IsDeleted)
                .Include(a => a.User)
                .Include(a => a.Course)
                .ToListAsync();
        }

        public async Task<PaginationResult<Announce>> GetAllAnnouncesWithDetailsAsync(Pagination pagination)
        {
            var query = _context.Set<Announce>()
                .AsNoTracking()
                .Where(a => !a.IsDeleted)
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
    }
}