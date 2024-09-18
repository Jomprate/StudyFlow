using StudyFlow.BLL.DTOS.Entities;

namespace StudyFlow.BLL.DTOS.OnboardingStudent.Request
{
    public class OnBoardingStudentCourseDTORequest
    {
        public Guid StudentId { get; set; } = default!;
        public string? TeacherNameFilter { get; set; }
        public CourseDTO? Request { get; set; } = null;
    }
}