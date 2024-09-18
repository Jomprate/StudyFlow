using StudyFlow.DAL.Entities;

namespace StudyFlow.DAL.Interfaces
{
    public interface IEnrollmentRepository
    {
        Task<IEnumerable<Enrollment>> GetEnrollmentsByStudentIdAsync(Guid studentId);

        Task<IEnumerable<Enrollment>> GetEnrollmentsByCourseIdAsync(Guid courseId);

        Task<Enrollment> GetEnrollmentByStudentAndCourseIdAsync(Guid studentId, Guid courseId);
    }
}