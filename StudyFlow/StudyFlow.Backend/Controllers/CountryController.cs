using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;
using StudyFlow.Shared;
using System.Globalization;
using System.Resources;

namespace StudyFlow.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountryController : ControllerBase
    {
        private readonly ICountryService _countryService;
        private readonly ResourceManager _resourceManager;

        public CountryController(ICountryService countryService)
        {
            _countryService = countryService;
            _resourceManager = new ResourceManager("StudyFlow.Shared.Resources.Countries.Countries", typeof(SharedResources).Assembly);
        }

        [HttpGet("GetAllCountries")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllCountries()
        {
            try
            {
                IEnumerable<Country> countries = await _countryService.GetAllAsync();
                return Ok(countries);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("GetAllCountriesWithLanguage/{language}")]
        public async Task<IActionResult> GetAllCountriesWithLanguage(string language)
        {
            // Check if the language parameter is null or empty
            if (string.IsNullOrWhiteSpace(language))
            {
                return BadRequest(new { message = "The 'language' parameter is required." });
            }

            try
            {
                Console.WriteLine($"Received language: {language}");

                IEnumerable<Country> countries = await _countryService.GetAllAsync();

                var culture = new CultureInfo(language);
                Console.WriteLine($"Using culture: {culture}");

                var translatedCountries = countries.ToDictionary(
                    c => c.IsoCode,
                    c => _resourceManager.GetString(c.IsoCode, culture) ?? c.Name
                );

                foreach (var country in translatedCountries)
                {
                    Console.WriteLine($"{country.Key}: {country.Value}");
                }

                return Ok(translatedCountries);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
    }
}