using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTO;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;

namespace StudyFlow.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InstitutionsController : ControllerBase
    {
        private readonly IInstitutionService _serviceInstitution;

        public InstitutionsController(IInstitutionService serviceInstitution)
        {
            _serviceInstitution = serviceInstitution;
        }

        #region GetAllInstitutions

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetInstitutionsAsync()
        {
            try
            {
                return await _serviceInstitution.GetInstitutionsAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
            }
        }

        #endregion GetAllInstitutions

        #region GetInstitutionById

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetInstitutionByIdAsync(int id)
        {
            try
            {
                return await _serviceInstitution.GetInstitutionByIdAsync(id);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
            }
        }

        #endregion GetInstitutionById

        #region GetInstitutionsByCountry

        [HttpGet("country")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetInstitutionsByCountryAsync([FromBody] Country country)
        {
            try
            {
                return await _serviceInstitution.GetInstitutionsByCountryAsync(country);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
            }
        }

        #endregion GetInstitutionsByCountry

        #region GetInstitutionsByCountryAndName

        [HttpGet("country/name")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetInstitutionsByCountryAndNameAsync([FromBody] Country country, [FromQuery] string institutionName)
        {
            try
            {
                return await _serviceInstitution.GetInstitutionsByCountryAndNameAsync(country, institutionName);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
            }
        }

        #endregion GetInstitutionsByCountryAndName

        #region CreateInstitution

        [HttpPost("/CreateInstitution")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateInstitutionAsync([FromBody] InstitutionDTO institution)
        {
            try
            {
                return await _serviceInstitution.CreateInstitutionAsync(institution);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
            }
        }

        #endregion CreateInstitution

        #region UpdateInstitution

        [HttpPut("/UpdateInstitution")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateInstitutionAsync([FromBody] Institution institution)
        {
            try
            {
                return await _serviceInstitution.UpdateInstitutionAsync(institution);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Ocurrió un error inesperado", Detalles = ex.Message });
            }
        }

        #endregion UpdateInstitution

        #region DeleteInstitution

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteInstitutionAsync(int id)
        {
            try
            {
                return await _serviceInstitution.DeleteInstitutionAsync(id);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
            }
        }

        #endregion DeleteInstitution
    }
}