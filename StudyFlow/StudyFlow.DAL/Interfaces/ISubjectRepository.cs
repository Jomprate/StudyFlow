using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Enumeration;

namespace StudyFlow.DAL.Interfaces
{
    public interface ISubjectRepository : IRepository<Subject>
    {
        Task<IEnumerable<Subject>> GetSubjectsByStudentIdAsync(Guid studentId);

        Task<IEnumerable<Subject>> GetSubjectsByTeacherIdAsync(Guid teacherId);

        Task<IEnumerable<Subject>> GetSubjectsFromCourseByTypeAsync(Guid courseId, SubjectTypeEnum subjectTypeEnum);

        Task<PaginationResult<Subject>> GetSubjectsByStudentIdAsync(Guid studentId, Pagination pagination);

        Task<PaginationResult<Subject>> GetSubjectsByTeacherIdAsync(Guid teacherId, Pagination pagination);

        Task<PaginationResult<Subject>> GetSubjectsFromCourseByTypeAsync(Guid courseId, SubjectTypeEnum subjectTypeEnum, Pagination pagination);

        Task<PaginationResult<Subject>> GetSubjectsByCourseIdAsync(Guid courseId, Pagination pagination);
    }
}