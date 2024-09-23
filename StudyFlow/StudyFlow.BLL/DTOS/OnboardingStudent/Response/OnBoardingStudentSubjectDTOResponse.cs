using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.BLL.DTOS.OnboardingStudent.Response
{
    public class OnBoardingStudentSubjectDTOResponse
    {
        public CourseDTO CourseDTO { get; set; } = null!;
        public PaginationResult<SubjectDTO> PaginationResult { get; set; } = null!;
    }
}