using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.OnboardingStudent.Request;
using StudyFlow.BLL.Interfaces;

namespace StudyFlow.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OnBoardingStudentController : ControllerBase
    {
        private readonly IOnboardingStudentService _onboardingStudentService;

        public OnBoardingStudentController(IOnboardingStudentService onboardingStudentService)
        {
            _onboardingStudentService = onboardingStudentService;
        }

        [HttpPost("AddRequestToCourseFromStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddRequestToCourseFromStudentAsync([FromBody] OnBoardingStudentCourseDTORequest onBoardingStudentDTO)
        {
            try
            {
                var result = await _onboardingStudentService.AddRequestToCourseFromStudentAsync(onBoardingStudentDTO);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpPost("DeleteRequestToCourseFromStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteRequestToCourseFromStudentAsync([FromBody] OnBoardingStudentCourseDTORequest onBoardingStudentDTO)
        {
            try
            {
                var result = await _onboardingStudentService.DeleteRequestToCourseFromStudentAsync(onBoardingStudentDTO);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetCoursesByStudentId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCoursesByStudentId([FromQuery] OnBoardingStudentCourseDTORequest onBoardingStudentDTO)
        {
            try
            {
                var result = await _onboardingStudentService.GetCoursesByStudentId(onBoardingStudentDTO);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetCoursesByTeacher")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCoursesByTeacher([FromQuery] OnBoardingStudentCourseDTORequest onBoardingStudentDTO)
        {
            try
            {
                var result = await _onboardingStudentService.GetCoursesByTeacherAsync(onBoardingStudentDTO);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }
    }
}