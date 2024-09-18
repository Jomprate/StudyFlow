using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
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

        public async Task<IEnumerable<Course>> GetAllCourseByTeacherIdAsync(Guid teacherId)
        {
            return await _context.Courses
                .Include(u => u.Teacher)
                .Where(u => u.TeacherId == teacherId)
                .ToArrayAsync();
        }

        public async Task<IEnumerable<Course>> GetGetAllCourseByStudentIdAsync(Guid studentId)
        {
            return await _context.Courses
                .Include(u => u.ListEnrollment)
                .Where(c => c.ListEnrollment.Any(e => e.StudentId == studentId))
                .ToArrayAsync();
        }

        public async Task<IEnumerable<Course>> GetCoursesByTeacherNameAsync(string name)
        {
            return await _context.Courses
                .Where(w => string.Concat(w.Teacher.FirstName, " ", w.Teacher.LastName)
                .Contains(name))
                .ToArrayAsync();
        }
    }
}