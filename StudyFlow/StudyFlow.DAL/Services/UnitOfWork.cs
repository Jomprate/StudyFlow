using Microsoft.EntityFrameworkCore.Storage;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.DAL.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        #region Private Fields

        private readonly DataContext _context;
        private IDbContextTransaction _transaction;
        private UserRepository _userRepository;
        private CourseRepository _courseRepository;
        private CountryRepository _countryRepository;
        private ProfileRepository _profileRepository;
        private EnrollmentRepository _enrollmentRepository;

        #endregion Private Fields

        #region Constructors

        public UnitOfWork(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        #endregion Constructors

        #region Public Properties

        public CountryRepository CountryRepository
        {
            get
            {
                return _countryRepository ??= new CountryRepository(_context);
            }
        }

        public UserRepository UserRepository
        {
            get
            {
                return _userRepository ??= new UserRepository(_context);
            }
        }

        public ProfileRepository ProfileRepository
        {
            get
            {
                return _profileRepository ??= new ProfileRepository(_context);
            }
        }

        public CourseRepository CourseRepository
        {
            get
            {
                return _courseRepository ??= new CourseRepository(_context);
            }
        }

        public EnrollmentRepository EnrollmentRepository
        {
            get
            {
                return _enrollmentRepository ??= new EnrollmentRepository(_context);
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