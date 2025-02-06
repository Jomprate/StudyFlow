using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.BLL.DTOS.OnBoardingTeacher.Request;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OnBoardingTeacherController : ControllerBase
    {
        private readonly IOnBoardingTeacherService _onBoardingTeacherService;

        public OnBoardingTeacherController(IOnBoardingTeacherService onBoardingTeacherService)
        {
            _onBoardingTeacherService = onBoardingTeacherService;
        }

        #region Courses

        [HttpGet("GetCourseById/{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCourseById(Guid courseId, [FromQuery] Guid? teacherId)
        {
            try
            {
                if (!teacherId.HasValue)
                {
                    return BadRequest(new { Error = "TeacherId is required." });
                }

                var getCourseTeacherDTORequest = new GetCourseTeacherDTORequest
                {
                    CourseId = courseId,
                    TeacherId = teacherId.Value
                };

                var result = await _onBoardingTeacherService.GetCourseByIdAsync(getCourseTeacherDTORequest);
                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetCourses")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCourses(GetCourseTeacherDTORequest getCourseTeacherDTORequest)
        {
            try
            {
                var result = await _onBoardingTeacherService.GetCoursesAsync(getCourseTeacherDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetCoursesByTeacherId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCoursesByTeacherId(Guid teacherId)
        {
            try
            {
                if (teacherId == Guid.Empty)
                {
                    return BadRequest(new { Error = "TeacherId is required." });
                }

                var result = await _onBoardingTeacherService.GetCoursesByTeacherIdAsync(teacherId);

                return result != null ? Ok(result) : NotFound(new { Error = "No courses found for the specified teacher." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetCoursesByTeacherIdPaginated")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCoursesByTeacherIdPaginated(Guid teacherId, [FromQuery] Pagination pagination)
        {
            try
            {
                if (teacherId == Guid.Empty)
                {
                    return BadRequest(new { Error = "TeacherId is required." });
                }

                var result = await _onBoardingTeacherService.GetCoursesByTeacherIdPaginatedAsync(teacherId, pagination);

                return result != null ? Ok(result) : NotFound(new { Error = "No courses found for the specified teacher." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpPut("UpdateCourse")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateCourse([FromBody] CourseDTO courseDTO)
        {
            try
            {
                var result = await _onBoardingTeacherService.UpdateCourseAsync(courseDTO);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpPost("CreateCourse")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateCourse([FromBody] CourseDTO courseDTO)
        {
            try
            {
                var result = await _onBoardingTeacherService.CreateCourseAsync(courseDTO);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpDelete("DeleteCourse")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteCourse([FromQuery] Guid courseId)
        {
            try
            {
                var result = await _onBoardingTeacherService.DeleteCourseAsync(courseId);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        #endregion Courses

        #region Enrollment

        [HttpPost("AddEnrollmentByStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddEnrollmentByStudent([FromBody] AddEnrollmentByStudentDTORequest addEnrollmentByStudentDTO)
        {
            try
            {
                var result = await _onBoardingTeacherService.AddEnrollmentByStudentAsync(addEnrollmentByStudentDTO);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetEnrollmentsByCourseId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetEnrollmentsByCourseId([FromQuery] GetEnrollmentsByCourseDTORequest getEnrollmentsByCourseDTORequest)
        {
            try
            {
                var result = await _onBoardingTeacherService.GetEnrollmentsByCourseIdAsync(getEnrollmentsByCourseDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetEnrollmentsEnabledByCourseId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetEnrollmentsEnabledByCourseId([FromQuery] GetEnrollmentsByCourseDTORequest getEnrollmentsByCourseDTORequest)
        {
            try
            {
                var result = await _onBoardingTeacherService.GetEnrollmentsEnabledByCourseIdAsync(getEnrollmentsByCourseDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("GetEnrollmentsCompletedByCourseId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetEnrollmentsCompletedByCourseId([FromQuery] GetEnrollmentsByCourseDTORequest getEnrollmentsByCourseDTORequest)
        {
            try
            {
                var result = await _onBoardingTeacherService.GetEnrollmentsCompletedByCourseIdAsync(getEnrollmentsByCourseDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpPut("SetEnrollmentByCourseid")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SetEnrollmentByCourseid([FromQuery] SetEnrollmentByCourseStudentDTORequest setEnrollmentByCourseStudentDTORequest)
        {
            try
            {
                var result = await _onBoardingTeacherService.SetEnrollmentByCourseidAsync(setEnrollmentByCourseStudentDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpDelete("DeleteEnrollmentByCourseId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteEnrollmentByCourseId([FromQuery] SetEnrollmentByCourseStudentDTORequest setEnrollmentByCourseStudentDTORequest)
        {
            try
            {
                var result = await _onBoardingTeacherService.DeleteEnrollmentByCourseIdAsync(setEnrollmentByCourseStudentDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        #endregion Enrollment

        #region Subject

        [HttpGet("GetSubjectByCourseId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetSubjectByCourseId([FromQuery] GetSubjectsByCourseDTORequest getSubjectsByCourseDTORequest)
        {
            try
            {
                var result = await _onBoardingTeacherService.GetSubjectByCourseIdAsync(getSubjectsByCourseDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpPost("AddSubjectByCourse")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddSubjectByCourse([FromBody] SetSubjectByCourseStudentDTORequest setSubjectByCourseStudentDTORequest)
        {
            try
            {
                var result = await _onBoardingTeacherService.AddSubjectByCourseAsync(setSubjectByCourseStudentDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpPut("UpdateSubjectSchedules")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateSubjectSchedules([FromBody] UpdateSubjectSchedulesDTORequest updateSubjectSchedulesDTORequest)
        {
            try
            {
                if (updateSubjectSchedulesDTORequest.SubjectId == null || updateSubjectSchedulesDTORequest.SubjectId == Guid.Empty)
                {
                    return BadRequest(new { Error = "SubjectId is required." });
                }

                if (updateSubjectSchedulesDTORequest.ListScheduleds == null || !updateSubjectSchedulesDTORequest.ListScheduleds.Any())
                {
                    return BadRequest(new { Error = "ListScheduleds is required." });
                }

                var result = await _onBoardingTeacherService.UpdateSubjectSchedulesAsync(updateSubjectSchedulesDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpPut("SetSubjectByCourse")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SetSubjectByCourse([FromBody] SetSubjectByCourseStudentDTORequest setSubjectByCourseStudentDTORequest)
        {
            try
            {
                var result = await _onBoardingTeacherService.SetSubjectByCourseAsync(setSubjectByCourseStudentDTORequest);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpDelete("DeleteSubjectById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteSubjectById([FromQuery] Guid subjectId)
        {
            try
            {
                var result = await _onBoardingTeacherService.DeleteSubjectById(subjectId);

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        #endregion Subject
    }
}