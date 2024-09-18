using StudyFlow.BLL.DTOS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.BLL.DTOS.OnboardingStudent.Request
{
    public class OnBoardingStudentSubjectDTORequest
    {
        public Guid? Id { get; set; }
        public Guid StudentId { get; set; } = default!;
        public TeacherDTO? TeacherDTO { get; set; } = new TeacherDTO();
        public CourseDTO? CourseDTO { get; set; } = new CourseDTO();
        public string? NameFilter { get; set; }
        public string? LinkFilter { get; set; }
        public string? TypeFilter { get; set; }
    }
}