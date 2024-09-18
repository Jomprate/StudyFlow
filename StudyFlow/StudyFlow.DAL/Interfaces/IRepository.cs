using System.Linq.Expressions;

namespace StudyFlow.DAL.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();

        Task<T> GetByIdAsync(int id);

        Task<T> GetByIdAsync(Guid id);

        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);

        Task<T> CreateAsync(T entity);

        Task<bool> UpdateAsync(T entity);

        Task<bool> DeleteAsync(T entity);
    }
}