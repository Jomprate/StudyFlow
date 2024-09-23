using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.OnboardingStudent.Request;
using StudyFlow.BLL.Interfaces;

namespace StudyFlow.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OnBoardingStudentController : ControllerBase
    {
        private readonly IOnBoardingStudentService _onboardingStudentService;

        public OnBoardingStudentController(IOnBoardingStudentService onboardingStudentService)
        {
            _onboardingStudentService = onboardingStudentService;
        }

        [HttpPost("AddRequestToCourseFromStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddRequestToCourseFromStudent([FromBody] EnrollmentFromStudentDTORequest enrollmentFromStudentDTORequest)
        {
            try
            {
                var result = await _onboardingStudentService.AddRequestToCourseFromStudentAsync(enrollmentFromStudentDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpDelete("DeleteRequestToCourseFromStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteRequestToCourseFromStudentAsync([FromBody] EnrollmentFromStudentDTORequest enrollmentFromStudentDTORequest)
        {
            try
            {
                var result = await _onboardingStudentService.DeleteRequestToCourseFromStudentAsync(enrollmentFromStudentDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetCoursesByStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCoursesByStudent([FromQuery] GetCourseStudentDTORequest getCourseStudentDTORequest)
        {
            try
            {
                var result = await _onboardingStudentService.GetCoursesByStudentIdAsync(getCourseStudentDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetCoursesByTeacherName")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCoursesByTeacherName([FromQuery] GetCourseStudentDTORequest getCourseStudentDTORequest)
        {
            try
            {
                var result = await _onboardingStudentService.GetCoursesByTeacherNameAsync(getCourseStudentDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetSubjectsByStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetSubjectsByStudent([FromQuery] OnBoardingStudentSubjectDTORequest onBoardingStudentSubjectDTORequest)
        {
            try
            {
                var result = await _onboardingStudentService.GetSubjectsByStudentIdAsync(onBoardingStudentSubjectDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetSubjectsByTeacher")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetSubjectsByTeacher([FromQuery] OnBoardingStudentSubjectDTORequest onBoardingStudentSubjectDTORequest)
        {
            try
            {
                var result = await _onboardingStudentService.GetSubjectsByTeacherIdAsync(onBoardingStudentSubjectDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetSubjectsFromCourseByType")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetSubjectsFromCourseByType([FromQuery] OnBoardingStudentSubjectDTORequest onBoardingStudentSubjectDTORequest)
        {
            try
            {
                var result = await _onboardingStudentService.GetSubjectsFromCourseByTypeAsync(onBoardingStudentSubjectDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetEnrollmentsCompletedByStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetEnrollmentsCompletedByStudent([FromQuery] EnrollmentFromStudentDTORequest enrollmentFromStudentDTORequest)
        {
            try
            {
                var result = await _onboardingStudentService.GetEnrollmentsCompletedByStudentIdAsync(enrollmentFromStudentDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetEnrollmentEnabledByStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetEnrollmentEnabledByStudent([FromQuery] EnrollmentFromStudentDTORequest enrollmentFromStudentDTORequest)
        {
            try
            {
                var result = await _onboardingStudentService.GetEnrollmentEnabledByStudentIdAsync(enrollmentFromStudentDTORequest);

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