using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class CountryService : ICountryService
    {
        private readonly IRepository<Country> _repository;

        public CountryService(IRepository<Country> repository)
        {
            _repository = repository;
        }

        public async Task<Country> GetByIdAsync(int id)
        {
            Country country = await _repository.GetByIdAsync(id);
            return country;
        }

        public async Task<IEnumerable<Country>> GetAllAsync()
        {
            IEnumerable<Country> countries = await _repository.GetAllAsync();
            return countries;
        }
    }
}