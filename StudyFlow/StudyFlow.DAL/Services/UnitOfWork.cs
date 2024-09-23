using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.DAL.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        #region Private Fields

        private readonly DataContext _context;
        private IDbContextTransaction _transaction;
        private IUserRepository _userRepository;
        private ICourseRepository _courseRepository;
        private ICountryRepository _countryRepository;
        private ISubjectRepository _subjectRepository;
        private IEnrollmentRepository _enrollmentRepository;
        private SignInManager<User> _signInManager;

        #endregion Private Fields

        #region Constructors

        public UnitOfWork(DataContext context, SignInManager<User> signInManager)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _signInManager = signInManager;
        }

        #endregion Constructors

        #region Public Properties

        public ICountryRepository CountryRepository
        {
            get
            {
                return _countryRepository ??= new CountryRepository(_context);
            }
        }

        public IUserRepository UserRepository
        {
            get
            {
                return _userRepository ??= new UserRepository(_context, _signInManager);
            }
        }

        public ICourseRepository CourseRepository
        {
            get
            {
                return _courseRepository ??= new CourseRepository(_context);
            }
        }

        public IEnrollmentRepository EnrollmentRepository
        {
            get
            {
                return _enrollmentRepository ??= new EnrollmentRepository(_context);
            }
        }

        public ISubjectRepository SubjectRepository
        {
            get
            {
                return _subjectRepository ??= new SubjectRepository(_context);
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