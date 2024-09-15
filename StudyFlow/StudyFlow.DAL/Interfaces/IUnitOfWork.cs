namespace StudyFlow.DAL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        void BeginTransaction();

        void Commit();

        void Rollback();

        Task<int> SaveChangesAsync();
    }
}