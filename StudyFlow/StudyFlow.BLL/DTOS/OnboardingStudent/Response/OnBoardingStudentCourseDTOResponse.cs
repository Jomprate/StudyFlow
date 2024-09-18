using StudyFlow.BLL.DTOS.Entities;

namespace StudyFlow.BLL.DTOS.OnboardingStudent.Response
{
    public class OnBoardingStudentCourseDTOResponse
    {
        public IEnumerable<CourseDTO>? ListCourses { get; set; } = Enumerable.Empty<CourseDTO>();
        public IEnumerable<CourseDTO>? ListRequest { get; set; } = Enumerable.Empty<CourseDTO>();
    }
}