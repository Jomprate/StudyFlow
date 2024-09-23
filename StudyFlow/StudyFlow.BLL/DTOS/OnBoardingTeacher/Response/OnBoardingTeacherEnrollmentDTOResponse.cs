using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.BLL.DTOS.OnBoardingTeacher
{
    public class OnBoardingTeacherEnrollmentDTOResponse
    {
        public Guid TeacherId { get; set; }
        public Guid CourseId { get; set; }

        public PaginationResult<EnrollmentDTO> PaginationResult { get; set; } = null!;
    }
}