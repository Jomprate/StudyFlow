namespace StudyFlow.DAL.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAsync();

        Task<T> GetAsync(int id);

        Task<int> CreateAsync(T entity);

        Task<int> UpdateAsync(T entity);

        Task<int> DeleteAsync(T entity);
    }
}