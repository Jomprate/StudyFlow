using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.BLL.DTOS.OnBoardingTeacher.Request;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.BLL.Interfaces
{
    public interface IOnBoardingTeacherService
    {
        Task<IActionResult> CreateCourseAsync(CourseDTO courseDTO);

        Task<IActionResult> DeleteCourseAsync(Guid courseId);

        Task<IActionResult> DeleteEnrollmentByCourseIdAsync(SetEnrollmentByCourseStudentDTORequest setEnrollmentByCourseStudentDTORequest);

        Task<IActionResult> GetCourseByIdAsync(GetCourseTeacherDTORequest getCourseTeacherDTORequest);

        Task<IActionResult> GetCoursesAsync(GetCourseTeacherDTORequest getCourseTeacherDTORequest);

        Task<IActionResult> GetCoursesByTeacherIdAsync(Guid teacherId);

        Task<IActionResult> GetCoursesByTeacherIdPaginatedAsync(Guid teacherId, Pagination pagination);

        Task<IActionResult> AddEnrollmentByStudentAsync(AddEnrollmentByStudentDTORequest addEnrollmentByStudentDTORequest);

        Task<IActionResult> GetEnrollmentsByCourseIdAsync(GetEnrollmentsByCourseDTORequest getEnrollmentsByCourseDTORequest);

        Task<IActionResult> GetEnrollmentsCompletedByCourseIdAsync(GetEnrollmentsByCourseDTORequest getEnrollmentsByCourseDTORequest);

        Task<IActionResult> GetEnrollmentsEnabledByCourseIdAsync(GetEnrollmentsByCourseDTORequest getEnrollmentsByCourseDTORequest);

        Task<IActionResult> SetEnrollmentByCourseidAsync(SetEnrollmentByCourseStudentDTORequest setEnrollmentByCourseStudentDTORequest);

        Task<IActionResult> UpdateCourseAsync(CourseDTO courseDTO);

        Task<IActionResult> GetSubjectByCourseIdAsync(GetSubjectsByCourseDTORequest getSubjectsByCourseDTORequest);

        Task<IActionResult> AddSubjectByCourseAsync(SetSubjectByCourseStudentDTORequest setSubjectByCourseStudentDTORequest);

        Task<IActionResult> SetSubjectByCourseAsync(SetSubjectByCourseStudentDTORequest setSubjectByCourseStudentDTORequest);

        Task<IActionResult> DeleteSubjectById(Guid subjectId);
    }
}