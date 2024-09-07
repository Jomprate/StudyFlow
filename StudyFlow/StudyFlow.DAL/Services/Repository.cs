using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
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
            try
            {
                await _dataContext.Set<T>().AddAsync(entity);
                return await _dataContext.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException != null && ex.InnerException.Message.Contains("duplicate key"))
                {
                    throw new ArgumentException($"A {nameof(T)} already exists in database.", ex);
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<int> DeleteAsync(T entity)
        {
            _dataContext.Set<T>().Remove(entity);
            return await _dataContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dataContext.Set<T>().Where(predicate).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dataContext.Set<T>().AsNoTracking().ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dataContext.Set<T>().FindAsync(id);
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _dataContext.Set<T>().FindAsync(id);
        }

        public async Task<int> UpdateAsync(T entity)
        {
            if (entity.GetType().IsSubclassOf(typeof(EntityAuditBase)))
            {
                var method = typeof(EntityAuditBase).GetMethod("OnAuditEntity");

                if (method != null)
                {
                    method.Invoke(entity, new object[] { });
                }
            }
            _dataContext.Set<T>().Update(entity);
            return await _dataContext.SaveChangesAsync();
        }
    }
}