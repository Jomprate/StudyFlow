using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.DAL.Services
{
    public class EnrollmentRepository : Repository<Enrollment>, IEnrollmentRepository
    {
        public EnrollmentRepository(DataContext dataContext) : base(dataContext)
        {
        }

        public async Task<IEnumerable<Enrollment>> GetEnrollmentsByStudentIdAsync(Guid studentId)
        {
            return await FindAsync(e => e.StudentId == studentId);
        }

        public async Task<IEnumerable<Enrollment>> GetEnrollmentsByCourseIdAsync(Guid courseId)
        {
            return await FindAsync(e => e.CourseId == courseId);
        }

        public async Task<Enrollment> GetEnrollmentByStudentAndCourseIdAsync(Guid studentId, Guid courseId)
        {
            return (Enrollment)await FindAsync(e => e.StudentId == studentId && e.CourseId == courseId);
        }
    }
}