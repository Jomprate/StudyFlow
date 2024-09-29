using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.Announce;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities.Helper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnnounceController : ControllerBase
    {
        private readonly IAnnounceService _announceService;

        public AnnounceController(IAnnounceService announceService)
        {
            _announceService = announceService;
        }

        [HttpGet("GetAllAnnounces")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllAnnouncesAsync()
        {
            try
            {
                return await _announceService.GetAllAnnouncesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetAllAnnouncesPaged")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllAnnouncesAsync([FromQuery] Pagination pagination)
        {
            try
            {
                return await _announceService.GetAllAnnouncesAsync(pagination);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetAnnounceWithDetails/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAnnounceWithDetailsAsync(Guid id)
        {
            try
            {
                return await _announceService.GetAnnounceWithDetailsAsync(id);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpPost("CreateAnnounce")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateAnnounceAsync([FromBody] AddAnnounceDTO announceDTO)
        {
            try
            {
                return await _announceService.CreateAnnounceAsync(announceDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpPut("UpdateAnnounce/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateAnnounceAsync(Guid id, [FromBody] AddAnnounceDTO announceDTO)
        {
            try
            {
                return await _announceService.UpdateAnnounceAsync(id, announceDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpDelete("DeleteAnnounce/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteAnnounceAsync(Guid id)
        {
            try
            {
                return await _announceService.DeleteAnnounceAsync(id);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetAnnouncesByCourse/{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAnnouncesByCourseIdAsync(Guid courseId, [FromQuery] Pagination pagination)
        {
            try
            {
                return await _announceService.GetAnnouncesByCourseIdAsync(courseId, pagination);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetAllAnnouncesWithDetails")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllAnnouncesWithDetailsAsync()
        {
            try
            {
                return await _announceService.GetAllAnnouncesWithDetailsAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetAllAnnouncesWithDetailsPaged")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllAnnouncesWithDetailsAsync([FromQuery] Pagination pagination)
        {
            try
            {
                return await _announceService.GetAllAnnouncesWithDetailsAsync(pagination);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }
    }
}