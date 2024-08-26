using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.DAL.Services
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DataContext _dataContext;

        public Repository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<int> CreateAsync(T entity)
        {
            await _dataContext.Set<T>().AddAsync(entity);
            return _dataContext.SaveChangesAsync().Result;
        }

        public async Task<int> DeleteAsync(T entity)
        {
            _dataContext.Set<T>().Remove(entity);
            return await _dataContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAsync()
        {
            return await _dataContext.Set<T>().ToListAsync();
        }

        public async Task<T> GetAsync(int id)
        {
            return await _dataContext.Set<T>().FindAsync(id);
        }

        public async Task<int> UpdateAsync(T entity)
        {
            _dataContext.Set<T>().Update(entity);
            return await _dataContext.SaveChangesAsync();
        }
    }
}