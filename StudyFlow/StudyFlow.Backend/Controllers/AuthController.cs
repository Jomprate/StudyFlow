using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StudyFlow.Backend.Authorize;
using StudyFlow.BLL.DTOS;
using StudyFlow.BLL.Interfaces;

namespace StudyFlow.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> LoginAsync([FromBody] LoginDTO loginDTO)
        {
            try
            {
                var token = await _authService.LoginAsync(loginDTO);

                if (!token.IsNullOrEmpty())
                {
                    return Ok(token);
                }
                return BadRequest("The email or the password is invalid. Try again.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpPost("LogOut")]
        [AuthorizeHeader]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> LogoutAsync([FromHeader(Name = "Authorization")] string token)
        {
            try
            {
                if (string.IsNullOrEmpty(token) || !token.StartsWith("Bearer "))
                {
                    return BadRequest("Token is required.");
                }

                var jwtToken = token.Substring("Bearer ".Length).Trim();
                var result = await _authService.LogoutAsync(jwtToken);

                if (result)
                {
                    return Ok("Logout successfully.");
                }
                return BadRequest("An unexpected error occurred.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }
    }
}