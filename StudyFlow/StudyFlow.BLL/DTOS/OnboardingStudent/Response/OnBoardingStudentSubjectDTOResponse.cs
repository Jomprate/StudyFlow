using StudyFlow.BLL.DTOS.Entities;

namespace StudyFlow.BLL.DTOS.OnboardingStudent.Response
{
    public class OnBoardingStudentSubjectDTOResponse
    {
        public CourseDTO CourseDTO { get; set; } = null!;
        public IEnumerable<SubjectDTO> ListSubjects { get; set; } = new List<SubjectDTO>();
    }
}