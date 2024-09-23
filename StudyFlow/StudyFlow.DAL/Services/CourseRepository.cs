using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.DAL.Services
{
    public class CourseRepository : Repository<Course>, ICourseRepository
    {
        private readonly DataContext _context;

        public CourseRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Course> GetByIdWithTeacherAsync(Guid id)
        {
            return await _context.Courses
                .AsNoTracking()
                .Include(u => u.Teacher)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<IEnumerable<Course>> GetAllCourseByTeacherIdAsync(Guid teacherId)
        {
            return await _context.Courses
                .Include(u => u.Teacher)
                .Where(u => u.TeacherId == teacherId)
                .ToArrayAsync();
        }

        public async Task<IEnumerable<Course>> GetAllCourseByStudentIdAsync(Guid studentId)
        {
            return await _context.Courses
                .Include(u => u.ListEnrollment)
                .Include(u => u.Teacher)
                .Where(c => c.ListEnrollment.Any(e => e.StudentId == studentId))
                .ToArrayAsync();
        }

        public async Task<PaginationResult<Course>> GetCoursesByTeacherNameAsync(Pagination pagination)
        {
            IQueryable<Course> query = _context.Courses
                .AsNoTracking()
                .Include(u => u.Teacher)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => string.Concat(x.Teacher.FirstName.ToLower(), " ", x.Teacher.LastName.ToLower())
                                        .Contains(pagination.Filter.ToLower()));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<Course>()
            {
                ListResult = await query
                    .Paginate(pagination)
                    .ToListAsync(),
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<PaginationResult<Course>> GetAllCourseByTeacherIdAsync(Guid teacherId, Pagination pagination)
        {
            IQueryable<Course> query = _context.Courses
                .AsNoTracking()
                .Include(u => u.Teacher)
                .Where(w => w.TeacherId == teacherId)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => x.Name.ToLower().Contains(pagination.Filter.ToLower()));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<Course>()
            {
                ListResult = await query
                    .Paginate(pagination)
                    .ToListAsync(),
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<PaginationResult<Course>> GetAllCourseByStudentIdAsync(Guid studentId, Pagination pagination)
        {
            IQueryable<Course> query = _context.Courses
                .AsNoTracking()
                .Include(u => u.Teacher)
                .Where(w => w.ListEnrollment.Any(e => e.StudentId == studentId))
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => x.Name.ToLower().Contains(pagination.Filter.ToLower()));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<Course>()
            {
                ListResult = await query
                    .Paginate(pagination)
                    .ToListAsync(),
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }
    }
}