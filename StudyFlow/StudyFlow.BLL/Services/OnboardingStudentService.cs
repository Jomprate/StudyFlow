using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.ApiResponse;
using StudyFlow.BLL.DTOS.OnboardingStudent.Request;
using StudyFlow.BLL.DTOS.OnboardingStudent.Response;
using StudyFlow.BLL.Interfaces;
using StudyFlow.BLL.Mapping;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class OnboardingStudentService : IOnboardingStudentService
    {
        private IUnitOfWork _unitOfWork;

        public OnboardingStudentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IActionResult> GetCoursesByStudentId(OnBoardingStudentCourseDTORequest onBoardingStudentDTO)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(onBoardingStudentDTO.StudentId);

            if (user == null)
            {
                return ApiResponseHelper.NotFound($"Not found user with the Id {onBoardingStudentDTO.StudentId}.");
            }

            IEnumerable<Course> listCourses = await _unitOfWork.CourseRepository.GetGetAllCourseByStudentIdAsync(onBoardingStudentDTO.StudentId);
            OnBoardingStudentCourseDTOResponse onBoardingStudentCourseDTOResponse = new()
            {
                ListCourses = listCourses.Select(s => s.ToDTO()).ToList()
            };
            onBoardingStudentCourseDTOResponse.ListCourses = listCourses.Select(s => s.ToDTO()).ToList();
            return ApiResponseHelper.Success(onBoardingStudentCourseDTOResponse);
        }

        public async Task<IActionResult> GetCoursesByTeacherAsync(OnBoardingStudentCourseDTORequest onBoardingStudentDTO)
        {
            if (string.IsNullOrEmpty(onBoardingStudentDTO.TeacherNameFilter))
            {
                return ApiResponseHelper.BadRequest("TeacherNameFilter is required.");
            }

            IEnumerable<Course> listCourses = await _unitOfWork.CourseRepository.GetCoursesByTeacherNameAsync(onBoardingStudentDTO.TeacherNameFilter);
            OnBoardingStudentCourseDTOResponse onBoardingStudentCourseDTOResponse = new()
            {
                ListCourses = listCourses.Select(s => s.ToDTO()).ToList()
            };
            return ApiResponseHelper.Success(onBoardingStudentCourseDTOResponse);
        }

        public async Task<IActionResult> AddRequestToCourseFromStudentAsync(OnBoardingStudentCourseDTORequest onBoardingStudentDTO)
        {
            if (onBoardingStudentDTO.Request?.Id == null)
            {
                return ApiResponseHelper.BadRequest("CourseId is required.");
            }

            var user = await _unitOfWork.UserRepository.GetByIdAsync(onBoardingStudentDTO.StudentId);

            if (user == null)
            {
                return ApiResponseHelper.NotFound($"User with Id {onBoardingStudentDTO.StudentId} not found.");
            }

            var course = await _unitOfWork.CourseRepository.GetByIdAsync(onBoardingStudentDTO.Request.Id.Value);

            if (course == null)
            {
                return ApiResponseHelper.NotFound($"Course with Id {onBoardingStudentDTO.Request.Id.Value} not found.");
            }

            await _unitOfWork.EnrollmentRepository.CreateAsync(new Enrollment
            {
                CourseId = course.Id,
                StudentId = user.Id,
                IsEnabled = false,
                IsCompleted = false
            });

            await _unitOfWork.SaveChangesAsync();

            return ApiResponseHelper.Create(new { Message = "Request added successfully." });
        }

        public async Task<IActionResult> DeleteRequestToCourseFromStudentAsync(OnBoardingStudentCourseDTORequest onBoardingStudentDTO)
        {
            if (onBoardingStudentDTO.Request?.Id == null)
            {
                return ApiResponseHelper.BadRequest("CourseId is required.");
            }

            var user = await _unitOfWork.UserRepository.GetByIdAsync(onBoardingStudentDTO.StudentId);

            if (user == null)
            {
                return ApiResponseHelper.NotFound($"User with Id {onBoardingStudentDTO.StudentId} not found.");
            }

            var course = await _unitOfWork.CourseRepository.GetByIdAsync(onBoardingStudentDTO.Request.Id.Value);

            if (course == null)
            {
                return ApiResponseHelper.NotFound($"Course with Id {onBoardingStudentDTO.Request.Id.Value} not found.");
            }

            var enrollment = await _unitOfWork.EnrollmentRepository.GetEnrollmentByStudentAndCourseIdAsync(course.Id, user.Id);

            if (enrollment == null)
            {
                return ApiResponseHelper.NotFound($"Enrollment not found.");
            }

            await _unitOfWork.EnrollmentRepository.DeleteAsync(enrollment);
            await _unitOfWork.SaveChangesAsync();

            return ApiResponseHelper.Success("Request deleted successfully.");
        }
    }
}