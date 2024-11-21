using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Enumeration;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.DAL.Services
{
    public class SubjectRepository : Repository<Subject>, ISubjectRepository
    {
        private readonly DataContext _dataContext;

        public SubjectRepository(DataContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Subject>> GetSubjectsByTeacherIdAsync(Guid teacherId)
        {
            return await _dataContext.Subjects
                .Include(c => c.Course)
                .Where(u => u.Course.TeacherId == teacherId)
                .ToArrayAsync();
        }

        public async Task<IEnumerable<Subject>> GetSubjectsByStudentIdAsync(Guid studentId)
        {
            return await _dataContext.Subjects
                .Include(c => c.Course)
                .Where(u => u.Course.ListEnrollment.Any(e => e.StudentId == studentId))
                .ToArrayAsync();
        }

        public async Task<IEnumerable<Subject>> GetSubjectsFromCourseByTypeAsync(Guid courseId, SubjectTypeEnum subjectTypeEnum)
        {
            return await _dataContext.Subjects
                .Include(u => u.Course)
                .Include(t => t.Course.Teacher)
                .Where(u => u.Course.Id == courseId && u.Type == subjectTypeEnum)
                .ToArrayAsync();
        }

        public async Task<PaginationResult<Subject>> GetSubjectsByStudentIdAsync(Guid studentId, Pagination pagination)
        {
            var query = _dataContext.Subjects
                .AsNoTracking()
                .Include(c => c.Course)
                .Where(u => u.Course.ListEnrollment.Any(e => e.StudentId == studentId))
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => x.Name.ToLower().Contains(pagination.Filter.ToLower()));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<Subject>
            {
                ListResult = await query.Paginate(pagination).ToArrayAsync(),
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<PaginationResult<Subject>> GetSubjectsByTeacherIdAsync(Guid teacherId, Pagination pagination)
        {
            var query = _dataContext.Subjects
                .AsNoTracking()
                .Include(c => c.Course)
                .Include(t => t.Course.Teacher)
                .Where(u => u.Course.Teacher.Id == teacherId)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => x.Name.ToLower().Contains(pagination.Filter));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<Subject>
            {
                ListResult = await query.Paginate(pagination).ToArrayAsync(),
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<PaginationResult<Subject>> GetSubjectsFromCourseByTypeAsync(Guid courseId, SubjectTypeEnum subjectTypeEnum, Pagination pagination)
        {
            var query = _dataContext.Subjects
                .AsNoTracking()
                .Include(u => u.Course)
                .Include(t => t.Course.Teacher)
                .Where(u => u.Course.Id == courseId && u.Type == subjectTypeEnum)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => x.Name.ToLower().Contains(pagination.Filter.ToLower()));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<Subject>
            {
                ListResult = await query.Paginate(pagination).ToArrayAsync(),
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<PaginationResult<Subject>> GetSubjectsByCourseIdAsync(Guid courseId, Pagination pagination)
        {
            var query = _dataContext.Subjects
                .AsNoTracking()
                .Include(u => u.Course)
                .Include(t => t.Course.Teacher)
                .Where(u => u.Course.Id == courseId)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Filter) && query.Any())
            {
                query = query.Where(x => x.Name.ToLower().Contains(pagination.Filter.ToLower()));
            }

            int totalRecords = await query.CountAsync();

            return new PaginationResult<Subject>
            {
                ListResult = await query
                    .Skip((pagination.Page - 1) * pagination.RecordsNumber)
                    .Take(pagination.RecordsNumber)
                    .ToListAsync(),
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }
    }
}