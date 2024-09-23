using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.DAL.Services
{
    public class EnrollmentRepository : Repository<Enrollment>, IEnrollmentRepository
    {
        private readonly DataContext _dataContext;

        public EnrollmentRepository(DataContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Enrollment>> GetEnrollmentsByStudentIdAsync(Guid studentId)
        {
            return await _dataContext.Enrollments
                .Include(s => s.Student)
                .Include(c => c.Course)
                .Include(t => t.Course.Teacher)
                .Where(e => e.StudentId == studentId)
                .ToArrayAsync();
        }

        public async Task<IEnumerable<Enrollment>> GetEnrollmentsByCourseIdAsync(Guid courseId)
        {
            return await _dataContext.Enrollments
                .Include(s => s.Student)
                .Include(c => c.Course)
                .Include(t => t.Course.Teacher)
                .Where(e => e.CourseId == courseId)
                .ToArrayAsync();
        }

        public async Task<Enrollment?> GetEnrollmentByStudentAndCourseIdAsync(Guid studentId, Guid courseId)
        {
            return await _dataContext.Enrollments
                .Include(s => s.Student)
                .Include(c => c.Course)
                .Include(t => t.Course.Teacher)
                .Where(e => e.CourseId == courseId && e.StudentId == studentId)
                .FirstOrDefaultAsync();
        }

        public async Task<PaginationResult<Enrollment>> GetEnrollmentsEnabledByStudentIdAsync(Guid studentId, Pagination pagination)
        {
            IQueryable<Enrollment> query = _dataContext.Enrollments
                .AsNoTracking()
                .Include(s => s.Student)
                .Include(c => c.Course)
                .Include(t => t.Course.Teacher)
                .Where(e => e.StudentId == studentId);

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => x.IsEnabled.Equals(bool.Parse(pagination.Filter)));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<Enrollment>()
            {
                ListResult = await query
                    .Paginate(pagination)
                    .ToListAsync(),
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<PaginationResult<Enrollment>> GetEnrollmentsEnabledByCourseIdAsync(Guid courseId, Pagination pagination)
        {
            IQueryable<Enrollment> query = _dataContext.Enrollments
                .AsNoTracking()
                .Include(s => s.Student)
                .Include(c => c.Course)
                .Include(t => t.Course.Teacher)
                .Where(e => e.CourseId == courseId);

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => x.IsEnabled.Equals(bool.Parse(pagination.Filter)));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<Enrollment>()
            {
                ListResult = await query
                    .Paginate(pagination)
                    .ToListAsync(),
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<PaginationResult<Enrollment>> GetEnrollmentsCompletedByStudentIdAsync(Guid studentId, Pagination pagination)
        {
            IQueryable<Enrollment> query = _dataContext.Enrollments
                .AsNoTracking()
                .Include(s => s.Student)
                .Include(c => c.Course)
                .Include(t => t.Course.Teacher)
                .Where(e => e.StudentId == studentId);

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => x.IsCompleted.Equals(bool.Parse(pagination.Filter)));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<Enrollment>()
            {
                ListResult = await query
                    .Paginate(pagination)
                    .ToListAsync(),
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<PaginationResult<Enrollment>> GetEnrollmentsCompletedByCourseIdAsync(Guid courseId, Pagination pagination)
        {
            IQueryable<Enrollment> query = _dataContext.Enrollments
                .AsNoTracking()
                .Include(s => s.Student)
                .Include(c => c.Course)
                .Include(t => t.Course.Teacher)
                .Where(e => e.CourseId == courseId);

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => x.IsCompleted.Equals(bool.Parse(pagination.Filter)));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<Enrollment>()
            {
                ListResult = await query
                    .Paginate(pagination)
                    .ToListAsync(),
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<PaginationResult<Enrollment>> GetEnrollmentsByStudentIdAsync(Guid studentId, Pagination pagination)
        {
            IQueryable<Enrollment> query = _dataContext.Enrollments
                .Include(s => s.Student)
                .Include(c => c.Course)
                .Include(t => t.Course.Teacher)
                .Where(e => e.StudentId == studentId);

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => x.Course.Name.ToLower().Contains(pagination.Filter.ToLower()));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<Enrollment>()
            {
                ListResult = await query
                    .Paginate(pagination)
                    .ToListAsync(),
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<PaginationResult<Enrollment>> GetEnrollmentsByCourseIdAsync(Guid courseId, Pagination pagination)
        {
            IQueryable<Enrollment> query = _dataContext.Enrollments
                .Include(s => s.Student)
                .Include(c => c.Course)
                .Include(t => t.Course.Teacher)
                .Where(e => e.CourseId == courseId);

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => x.Course.Name.ToLower().Contains(pagination.Filter.ToLower()));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<Enrollment>()
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