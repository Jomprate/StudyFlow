using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.BLL.DTOS.OnboardingStudent.Request
{
    public class OnBoardingStudentCourseDTORequest
    {
        public Guid? StudentId { get; set; }
        public Guid? CourseId { get; set; }
        public CourseDTO? Request { get; set; } = null;
        public Pagination? Pagination { get; set; } = null!;
    }
}