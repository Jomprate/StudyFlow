using StudyFlow.BLL.DTOS.User;

namespace StudyFlow.BLL.DTOS.Entities
{
    public class EnrollmentDTO
    {
        public CourseDTO CourseDTO { get; set; }
        public GetUserDTO StudentDTO { get; set; }
        public bool? IsEnabled { get; set; }
        public bool? IsCompleted { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
    }
}