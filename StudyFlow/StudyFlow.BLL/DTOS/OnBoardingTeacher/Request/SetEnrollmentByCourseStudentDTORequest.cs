using StudyFlow.BLL.DTOS.Entities;
using System.ComponentModel.DataAnnotations;

namespace StudyFlow.BLL.DTOS.OnBoardingTeacher.Request
{
    public class SetEnrollmentByCourseStudentDTORequest
    {
        [Required]
        public Guid CourseId { get; set; }

        [Required]
        public Guid StudentId { get; set; }

        public bool? IsEnabled { get; set; }

        public bool? IsCompleted { get; set; }
    }
}