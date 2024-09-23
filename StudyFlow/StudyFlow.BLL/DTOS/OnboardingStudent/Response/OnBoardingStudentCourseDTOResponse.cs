using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.BLL.DTOS.OnboardingStudent.Response
{
    public class OnBoardingStudentCourseDTOResponse
    {
        public PaginationResult<CourseDTO>? PaginationResult { get; set; } = null!;
    }
}