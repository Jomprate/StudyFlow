using StudyFlow.DAL.Services;

namespace StudyFlow.DAL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ICountryRepository CountryRepository { get; }
        ICourseRepository CourseRepository { get; }
        IUserRepository UserRepository { get; }
        IEnrollmentRepository EnrollmentRepository { get; }
        ISubjectRepository SubjectRepository { get; }

        void BeginTransaction();

        void Commit();

        void Dispose();

        void Rollback();

        Task<int> SaveChangesAsync();
    }
}