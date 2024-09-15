using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.DAL.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        #region Private Fields

        private readonly DataContext _context;
        private IDbContextTransaction _transaction;
        private UserRepository _userRepository;

        #endregion Private Fields

        #region Constructors

        public UnitOfWork(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        #endregion Constructors

        #region Public Properties

        public UserRepository UserRepository
        {
            get
            {
                return _userRepository ??= new UserRepository(_context);
            }
        }

        #endregion Public Properties

        #region Public Methods

        public void BeginTransaction()
        {
            _transaction = _context.Database.BeginTransaction();
        }

        public void Commit()
        {
            try
            {
                _context.SaveChanges();
                _transaction?.Commit();
            }
            catch
            {
                Rollback();
                throw;
            }
        }

        public void Rollback()
        {
            _transaction?.Rollback();
            _transaction?.Dispose();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _transaction?.Dispose();
            _context?.Dispose();
        }

        #endregion Public Methods
    }
}