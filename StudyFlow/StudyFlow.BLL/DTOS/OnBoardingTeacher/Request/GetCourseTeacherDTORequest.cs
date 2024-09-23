using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.BLL.DTOS.OnBoardingTeacher.Request
{
    public class GetCourseTeacherDTORequest
    {
        public Guid? TeacherId { get; set; }
        public Guid? CourseId { get; set; }
        public Pagination? Pagination { get; set; } = new Pagination();
    }
}