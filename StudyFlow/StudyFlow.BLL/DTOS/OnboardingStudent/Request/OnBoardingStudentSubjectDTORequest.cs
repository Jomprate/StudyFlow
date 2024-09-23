using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.BLL.DTOS.OnboardingStudent.Request
{
    public class OnBoardingStudentSubjectDTORequest
    {
        public Guid? Id { get; set; }
        public Guid? StudentId { get; set; }
        public Guid? TeacherId { get; set; }
        public Guid? CourseId { get; set; }
        public Pagination Pagination { get; set; } = new Pagination();
    }
}