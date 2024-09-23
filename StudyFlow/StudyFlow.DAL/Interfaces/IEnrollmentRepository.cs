using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.DAL.Interfaces
{
    public interface IEnrollmentRepository : IRepository<Enrollment>
    {
        Task<IEnumerable<Enrollment>> GetEnrollmentsByStudentIdAsync(Guid studentId);

        Task<IEnumerable<Enrollment>> GetEnrollmentsByCourseIdAsync(Guid courseId);

        Task<Enrollment?> GetEnrollmentByStudentAndCourseIdAsync(Guid studentId, Guid courseId);

        Task<PaginationResult<Enrollment>> GetEnrollmentsEnabledByStudentIdAsync(Guid studentId, Pagination pagination);

        Task<PaginationResult<Enrollment>> GetEnrollmentsEnabledByCourseIdAsync(Guid courseId, Pagination pagination);

        Task<PaginationResult<Enrollment>> GetEnrollmentsCompletedByStudentIdAsync(Guid studentId, Pagination pagination);

        Task<PaginationResult<Enrollment>> GetEnrollmentsCompletedByCourseIdAsync(Guid courseId, Pagination pagination);

        Task<PaginationResult<Enrollment>> GetEnrollmentsByStudentIdAsync(Guid studentId, Pagination pagination);

        Task<PaginationResult<Enrollment>> GetEnrollmentsByCourseIdAsync(Guid courseId, Pagination pagination);
    }
}