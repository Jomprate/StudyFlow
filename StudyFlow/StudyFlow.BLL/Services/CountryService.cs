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

        public async Task<IActionResult> CreateCountryAsync(Country country)
        {
            if (country == null)
            {
                return new BadRequestObjectResult(new { Error = "The country cannot be null." });
            }

            if (string.IsNullOrWhiteSpace(country.Name))
            {
                return new BadRequestObjectResult(new { Error = "The country name cannot be empty or just whitespace." });
            }

            if (string.IsNullOrWhiteSpace(country.IsoCode))
            {
                return new BadRequestObjectResult(new { Error = "The ISO code cannot be empty or just whitespace." });
            }

            country.IsoCode = country.IsoCode.Trim().ToUpper();

            if (country.IsoCode.Length != 3)
            {
                return new BadRequestObjectResult(new { Error = "The ISO code must be exactly 3 characters long." });
            }

            var existingCountries = await _repository.GetAllAsync();

            if (existingCountries.Any(c => c.Name.Equals(country.Name, StringComparison.CurrentCultureIgnoreCase)))
            {
                return new BadRequestObjectResult(new { Error = "A country with the same name already exists." });
            }

            if (existingCountries.Any(c => c.IsoCode.Equals(country.IsoCode, StringComparison.CurrentCultureIgnoreCase)))
            {
                return new BadRequestObjectResult(new { Error = "A country with the same ISO code already exists." });
            }

            int result = await _repository.CreateAsync(country);

            if (result > 0)
            {
                return new OkObjectResult(new { Message = "Country created successfully" });
            }
            else
            {
                return new BadRequestObjectResult(new { Message = "Failed to create country" });
            }
        }

        public async Task<IActionResult> DeleteCountryAsync(int id)
        {
            if (id <= 0)
            {
                return new BadRequestObjectResult(new { Error = "The Id cannot be 0 or null." });
            }

            var country = await _repository.GetAsync(id);

            if (country == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found country with the Id {id}." });
            }

            int result = await _repository.DeleteAsync(country);

            if (result > 0)
            {
                return new OkObjectResult(new { Message = "Country deleted successfully" });
            }
            else
            {
                return new BadRequestObjectResult(new { Message = "Failed to delete country" });
            }
        }

        public async Task<IActionResult> GetAsync()
        {
            IEnumerable<Country> countries = await _repository.GetAllAsync();
            return new OkObjectResult(countries);
        }

        public async Task<IActionResult> GetCountryAsync(int id)
        {
            Country country = await _repository.GetAsync(id);

            if (country == null)
            {
                return new NotFoundObjectResult(new { Message = "Country not found" });
            }

            return new OkObjectResult(country);
        }

        public async Task<IActionResult> UpdateCountryAsync(Country country)
        {
            if (country == null || country.Id <= 0)
            {
                return new BadRequestObjectResult(new { Error = "The Id cannot be 0 or null." });
            }

            var currentCountry = await _repository.GetAsync(country.Id);

            if (currentCountry == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found country with the Id {country.Id}." });
            }

            currentCountry.Name = country.Name;
            currentCountry.IsoCode = country.IsoCode;
            var existingCountry = await _repository.UpdateAsync(country);

            if (existingCountry == null)
            {
                return new NotFoundObjectResult(new { Message = "Country not found" });
            }

            int result = await _repository.UpdateAsync(country);

            if (result > 0)
            {
                return new OkObjectResult(new { Message = "Country updated successfully" });
            }
            else
            {
                return new BadRequestObjectResult(new { Message = "Failed to update country" });
            }
        }

        public async Task<IActionResult> UpdateCountryIsoCodeAsync(int id, string newIsoCode)
        {
            if (id <= 0)
            {
                return new BadRequestObjectResult(new { Error = "The Id cannot be 0 or null." });
            }

            if (string.IsNullOrWhiteSpace(newIsoCode))
            {
                return new BadRequestObjectResult(new { Error = "The ISO code cannot be empty or just whitespace." });
            }

            if (newIsoCode.Length != 2 && newIsoCode.Length != 3)
            {
                return new BadRequestObjectResult(new { Error = "The ISO code must be exactly 2 or 3 characters long." });
            }

            var country = await _repository.GetAsync(id);

            if (country == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found country with the Id {id}." });
            }

            var existingCountry = _repository.GetAllAsync().Result.FirstOrDefault(c => c.IsoCode.Equals(newIsoCode, StringComparison.CurrentCultureIgnoreCase));

            if (existingCountry != null && existingCountry.Id != id)
            {
                return new BadRequestObjectResult(new { Error = "Already exists a country with the ISO code." });
            }

            country.IsoCode = newIsoCode.ToUpper();

            int result = await _repository.UpdateAsync(country);
            if (result == 0)
            {
                return new BadRequestObjectResult(new { Error = "Failed to update country" });
            }

            return new NotFoundObjectResult(new { Message = "Country updated successfully" });
        }

        public async Task<IActionResult> UpdateCountryNameAsync(int id, string newName)
        {
            if (id <= 0)
            {
                return new BadRequestObjectResult(new { Error = "The Id cannot be 0 or null." });
            }

            if (string.IsNullOrWhiteSpace(newName))
            {
                return new BadRequestObjectResult(new { Error = "The country name cannot be empty or just whitespace." });
            }

            var country = await _repository.GetAsync(id);

            if (country == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found country with the Id {id}." });
            }

            country.Name = newName;
            _repository.UpdateAsync(country);
            int result = await _repository.UpdateAsync(country);

            if (result == 0)
            {
                return new BadRequestObjectResult(new { Error = "Failed to update country" });
            }

            return new NotFoundObjectResult(new { Message = "Country updated successfully" });
        }
    }
}