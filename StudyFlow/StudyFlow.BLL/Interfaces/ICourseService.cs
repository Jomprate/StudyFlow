using Microsoft.AspNetCore.Mvc;

namespace StudyFlow.BLL.Interfaces
{
    internal interface ICourseService
    {
        Task<IActionResult> GetAllCoursesByUserTeacherAsync();

        Task<IActionResult> GetAllCoursesByUserStudentAsync();
    }
}