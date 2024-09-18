using StudyFlow.DAL.Entities;

namespace StudyFlow.DAL.Interfaces
{
    public interface ICourseRepository
    {
        Task<IEnumerable<Course>> GetGetAllCourseByStudentIdAsync(Guid studentId);

        Task<IEnumerable<Course>> GetCoursesByTeacherNameAsync(string name);
    }
}