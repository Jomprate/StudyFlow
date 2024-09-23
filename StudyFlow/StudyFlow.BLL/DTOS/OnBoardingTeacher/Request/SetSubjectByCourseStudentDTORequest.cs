using StudyFlow.BLL.DTOS.Entities;
using System.ComponentModel.DataAnnotations;

namespace StudyFlow.BLL.DTOS.OnBoardingTeacher.Request
{
    public class SetSubjectByCourseStudentDTORequest
    {
        [Required]
        public Guid CourseId { get; set; }

        public SubjectDTO SubjectDTO { get; set; } = null!;
    }
}