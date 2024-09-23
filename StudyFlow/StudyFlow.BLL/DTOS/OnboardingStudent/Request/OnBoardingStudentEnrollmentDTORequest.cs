using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Entities.Helper;

namespace StudyFlow.BLL.DTOS.OnboardingStudent.Request
{
    public class OnBoardingStudentEnrollmentDTORequest
    {
        public EnrollmentDTO EnrollmentDTO { get; set; } = null!;
        public Pagination Pagination { get; set; } = null!;
    }
}