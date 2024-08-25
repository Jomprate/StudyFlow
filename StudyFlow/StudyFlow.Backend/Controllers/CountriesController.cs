using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudyFlow.Backend.Data;
using StudyFlow.Shared.Entities;

namespace StudyFlow.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountriesController : ControllerBase
    {
        private readonly DataContext _context;

        public CountriesController(DataContext context)
        {
            _context = context;
        }

        #region GetAllCountries

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAsync()
        {
            try
            {
                var countries = await _context.Countries.ToListAsync();

                if (countries == null || countries.Count == 0)
                {
                    return NotFound(new { Error = "No se encontraron países en la base de datos." });
                }

                return Ok(countries);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Error = "Parámetro inválido.", Detalles = ex.Message });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Error al interactuar con la base de datos.", Detalles = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Operación inválida.", Detalles = ex.Message });
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
                if (id <= 0)
                {
                    return BadRequest(new { Error = "El ID proporcionado no es válido." });
                }

                var country = await _context.Countries.FindAsync(id);

                if (country == null)
                {
                    return NotFound(new { Error = $"No se encontró un país con el ID {id}." });
                }

                return Ok(country);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Error = "Parámetro inválido.", Detalles = ex.Message });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Error al interactuar con la base de datos.", Detalles = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Operación inválida.", Detalles = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
            }
        }

        #endregion GetCountryById

        #region Create Country

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Post(Country country)
        {
            try
            {
                _context.Add(country);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(Post), new { id = country.Id }, country);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Ocurrió un error en la base de datos.", Detalles = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
            }
        }

        #endregion Create Country

        #region UpdateCountryNameById

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateCountryNameAsync(int id, [FromBody] string newName)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new { Error = "El ID proporcionado no es válido." });
                }

                if (string.IsNullOrWhiteSpace(newName))
                {
                    return BadRequest(new { Error = "El nombre del país no puede estar vacío o ser solo espacios en blanco." });
                }

                var country = await _context.Countries.FindAsync(id);

                if (country == null)
                {
                    return NotFound(new { Error = $"No se encontró un país con el ID {id}." });
                }

                country.Name = newName;

                _context.Countries.Update(country);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "El nombre del país fue actualizado con éxito." });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Error al actualizar la base de datos.", Detalles = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Operación inválida.", Detalles = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
            }
        }

        #endregion UpdateCountryNameById

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
                if (country == null || country.Id <= 0)
                {
                    return BadRequest(new { Error = "La solicitud contiene datos inválidos." });
                }

                var currentCountry = await _context.Countries
                    .FirstOrDefaultAsync(c => c.Id == country.Id);

                if (currentCountry == null)
                {
                    return NotFound(new { Error = $"No se encontró un país con el ID {country.Id}." });
                }

                currentCountry.Name = country.Name;

                _context.Countries.Update(currentCountry);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "El país fue actualizado con éxito." });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Error al actualizar la base de datos.", Detalles = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Operación inválida.", Detalles = ex.Message });
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
                if (id <= 0)
                {
                    return BadRequest(new { Error = "El ID proporcionado no es válido." });
                }

                var country = await _context.Countries.FindAsync(id);

                if (country == null)
                {
                    return NotFound(new { Error = $"No se encontró un país con el ID {id}." });
                }

                _context.Countries.Remove(country);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "El país fue borrado con éxito." });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Error al borrar en la base de datos.", Detalles = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Operación inválida.", Detalles = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "Ocurrió un error inesperado.", Detalles = ex.Message });
            }
        }

        #endregion DeleteCountry
    }
}