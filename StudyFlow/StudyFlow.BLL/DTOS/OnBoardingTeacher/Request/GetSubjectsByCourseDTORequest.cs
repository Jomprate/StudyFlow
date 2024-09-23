using StudyFlow.DAL.Entities.Helper;
using System.ComponentModel.DataAnnotations;

namespace StudyFlow.BLL.DTOS.OnBoardingTeacher.Request
{
    public class GetSubjectsByCourseDTORequest
    {
        [Required]
        public Guid CourseId { get; set; }

        public Pagination Pagination { get; set; } = new Pagination();
    }
}