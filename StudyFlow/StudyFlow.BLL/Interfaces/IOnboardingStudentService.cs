using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.OnboardingStudent.Request;

namespace StudyFlow.BLL.Interfaces
{
    public interface IOnboardingStudentService
    {
        Task<IActionResult> AddRequestToCourseFromStudentAsync(OnBoardingStudentCourseDTORequest onBoardingStudentDTO);
        Task<IActionResult> DeleteRequestToCourseFromStudentAsync(OnBoardingStudentCourseDTORequest onBoardingStudentDTO);
        Task<IActionResult> GetCoursesByStudentId(OnBoardingStudentCourseDTORequest onBoardingStudentDTO);
        Task<IActionResult> GetCoursesByTeacherAsync(OnBoardingStudentCourseDTORequest onBoardingStudentDTO);
    }
}