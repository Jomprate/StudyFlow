using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyFlow.Backend.Authorize;
using StudyFlow.BLL.DTOS.ApiResponse;
using StudyFlow.BLL.DTOS.Authenticate.Request;
using StudyFlow.BLL.DTOS.User;
using StudyFlow.BLL.Interfaces;
using System.Security.Claims;
using static StudyFlow.BLL.Services.UserService;

namespace StudyFlow.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("GetAllUsers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            try
            {
                return await _userService.GetAllUsersAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("CreateUser")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateUserAsync([FromBody] AddUserDTO user)
        {
            try
            {
                return await _userService.CreateUserAsync(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("DeleteUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteUserAsync([FromBody] Guid id)
        {
            try
            {
                return await _userService.DeleteUserAsync(id);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("GetUserById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUserByIdAsync(Guid id)
        {
            try
            {
                return await _userService.GetUserByIdAsync(id);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [Authorize]
        [HttpPut("UpdateUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateUserAsync([FromBody] UpdateUserDTO user)
        {
            try
            {
                return await _userService.UpdateUserAsync(user, User.FindFirst(ClaimsIdentity.DefaultNameClaimType)?.Value);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("ConfirmEmail")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ConfirmEmailAsync([FromBody] EmailConfirmationRequest request)
        {
            try
            {
                return await _userService.ConfirmMailUserTokenAsync(request);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("ResendConfirmEmailByEmail")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ResendConfirmEmailByEmailAsync([FromBody] RecoverPasswordRequestDTO request)
        {
            try
            {
                return await _userService.ResendConfirmEmailByEmailAsync(request);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [Authorize]
        [HttpPut("UpdatePassword")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdatePasswordAsync([FromBody] UpdatePasswordDTO updatePasswordDTO)
        {
            try
            {
                var userId = User.FindFirst(ClaimsIdentity.DefaultNameClaimType)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return StatusCode(StatusCodes.Status401Unauthorized,
                        new { Error = "User is not authenticated or missing unique_name claim." });
                }

                return await _userService.UpdatePasswordAsync(updatePasswordDTO, userId);
            }
            catch (Exception ex)
            {
                // Manejo de errores y log
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }
    }
}