using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.BLL.DTOS.OnboardingStudent.Response
{
    public class OnBoardingStudentEnrollmentDTOResponse
    {
        public Guid StudentId { get; set; }

        public PaginationResult<EnrollmentDTO> PaginationResult { get; set; } = null!;
    }
}