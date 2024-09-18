using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class CountryService : ICountryService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CountryService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Country> GetByIdAsync(int id)
        {
            Country country = await _unitOfWork.CountryRepository.GetByIdAsync(id);
            return country;
        }

        public async Task<IEnumerable<Country>> GetAllAsync()
        {
            IEnumerable<Country> countries = await _unitOfWork.CountryRepository.GetAllAsync();
            return countries;
        }
    }
}