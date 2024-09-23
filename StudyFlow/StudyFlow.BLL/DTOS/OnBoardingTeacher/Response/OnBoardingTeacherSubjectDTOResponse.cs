using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.BLL.DTOS.OnBoardingTeacher
{
    public class OnBoardingTeacherSubjectDTOResponse
    {
        public CourseDTO? CourseDTO { get; set; } = null!;
        public PaginationResult<SubjectDTO>? PaginationResult { get; set; } = null!;
    }
}