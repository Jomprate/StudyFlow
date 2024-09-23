using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.BLL.DTOS.OnBoardingTeacher
{
    public class OnBoardingTeacherCourseDTOResponse
    {
        public CourseDTO? CourseDTO { get; set; } = null!;
        public PaginationResult<CourseDTO>? PaginationResult { get; set; } = null!;
    }
}