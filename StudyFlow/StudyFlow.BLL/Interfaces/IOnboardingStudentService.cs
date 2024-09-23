using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.OnboardingStudent.Request;

namespace StudyFlow.BLL.Interfaces
{
    public interface IOnBoardingStudentService
    {
        Task<IActionResult> AddRequestToCourseFromStudentAsync(EnrollmentFromStudentDTORequest enrollmentFromStudentDTORequest);

        Task<IActionResult> DeleteRequestToCourseFromStudentAsync(EnrollmentFromStudentDTORequest enrollmentFromStudentDTORequest);

        Task<IActionResult> GetCoursesByStudentIdAsync(GetCourseStudentDTORequest getCourseStudentDTORequest);

        Task<IActionResult> GetCoursesByTeacherNameAsync(GetCourseStudentDTORequest getCourseStudentDTORequest);

        Task<IActionResult> GetSubjectsByStudentIdAsync(OnBoardingStudentSubjectDTORequest onBoardingStudentSubjectDTORequest);

        Task<IActionResult> GetSubjectsByTeacherIdAsync(OnBoardingStudentSubjectDTORequest onBoardingStudentSubjectDTORequest);

        Task<IActionResult> GetSubjectsFromCourseByTypeAsync(OnBoardingStudentSubjectDTORequest onBoardingStudentSubjectDTORequest);

        Task<IActionResult> GetEnrollmentsCompletedByStudentIdAsync(EnrollmentFromStudentDTORequest enrollmentFromStudentDTORequest);

        Task<IActionResult> GetEnrollmentEnabledByStudentIdAsync(EnrollmentFromStudentDTORequest enrollmentFromStudentDTORequest);
    }
}