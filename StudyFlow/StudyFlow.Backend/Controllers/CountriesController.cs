using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;

namespace StudyFlow.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CountriesController : ControllerBase
{
    private readonly ICountryService _serviceCountry;

    public CountriesController(ICountryService serviceCountry)
    {
        _serviceCountry = serviceCountry;
    }

    #region GetAllCountries

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAsync()
    {
        try
        {
            return await _serviceCountry.GetAsync();
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
        }
    }

    #endregion GetAllCountries

    #region GetCountryById

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        try
        {
            return await _serviceCountry.GetCountryAsync(id); ;
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
        }
    }

    #endregion GetCountryById

    #region CreateCountry

    [HttpPost("/createCountry")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Post(Country country)
    {
        try
        {
            return await _serviceCountry.CreateCountryAsync(country);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
        }
    }

    #endregion CreateCountry

    #region UpdateCountryNameById

    [HttpPut("{id}/name")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateCountryNameAsync(int id, [FromBody] string newName)
    {
        try
        {
            return await _serviceCountry.UpdateCountryNameAsync(id, newName);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
        }
    }

    #endregion UpdateCountryNameById

    #region UpdateCountryIsoCodeById

    [HttpPut("{id}/isocode")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateCountryIsoCodeAsync(int id, [FromBody] string newIsoCode)
    {
        try
        {
            return await _serviceCountry.UpdateCountryIsoCodeAsync(id, newIsoCode);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
        }
    }

    #endregion UpdateCountryIsoCodeById

    #region UpdateCountry

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> PutAsync(Country country)
    {
        try
        {
            return await _serviceCountry.UpdateCountryAsync(country);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
        }
    }

    #endregion UpdateCountry

    #region DeleteCountry

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteCountryAsync(int id)
    {
        try
        {
            return await _serviceCountry.DeleteCountryAsync(id);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
        }
    }

    #endregion DeleteCountry
}