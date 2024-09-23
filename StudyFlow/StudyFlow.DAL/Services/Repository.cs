using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
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

        public async Task<T> CreateAsync(T entity)
        {
            try
            {
                if (entity.GetType().IsSubclassOf(typeof(EntityAuditBase)))
                {
                    var method = typeof(EntityAuditBase).GetMethod("OnAuditEntity");

                    if (method != null)
                    {
                        method.Invoke(entity, new object[] { });
                    }
                }
                var entry = await _dataContext.Set<T>().AddAsync(entity);
                return entry.Entity;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> DeleteAsync(T entity)
        {
            try
            {
                _dataContext.Set<T>().Remove(entity);
                return true;
            }
            catch
            {
                throw;
            }
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

        public async Task<bool> UpdateAsync(T entity)
        {
            try
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
                return true;
            }
            catch
            {
                throw;
            }
        }

        public virtual async Task<PaginationResult<T>> GetAsync(Pagination pagination)
        {
            var queryable = _dataContext.Set<T>().AsNoTracking().AsQueryable();
            int totalRecords = await queryable.CountAsync();

            return new PaginationResult<T>()
            {
                TotalRecords = await queryable.CountAsync(),
                ListResult = await queryable
                    .Paginate(pagination)
                    .ToListAsync(),
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pagination.RecordsNumber),
                Pagination = pagination
            };
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dataContext.Set<T>().AnyAsync(predicate);
        }
    }
}