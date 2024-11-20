using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.DAL.Interfaces
{
    public interface ICourseRepository : IRepository<Course>
    {
        Task<Course> GetByIdWithTeacherAsync(Guid id);

        Task<IEnumerable<Course>> GetAllCourseByTeacherIdAsync(Guid teacherId);

        Task<IEnumerable<Course>> GetAllCourseByStudentIdAsync(Guid studentId);

        Task<PaginationResult<Course>> GetCoursesByTeacherNameAsync(Pagination pagination);

        Task<PaginationResult<Course>> GetAllCourseByTeacherIdAsync(Guid teacherId, Pagination pagination);

        Task<PaginationResult<Course>> GetAllCourseByStudentIdAsync(Guid studentId, Pagination pagination);

        Task<bool> UpdateCourseLogoAsync(Guid courseId, string base64Logo);
    }
}