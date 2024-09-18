using StudyFlow.DAL.Services;

namespace StudyFlow.DAL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        CountryRepository CountryRepository { get; }
        CourseRepository CourseRepository { get; }
        UserRepository UserRepository { get; }
        ProfileRepository ProfileRepository { get; }
        EnrollmentRepository EnrollmentRepository { get; }

        void BeginTransaction();

        void Commit();

        void Dispose();

        void Rollback();

        Task<int> SaveChangesAsync();
    }
}