namespace StudyFlow.BLL.DTOS.Entities
{
    public class CourseDTO
    {
        public Guid? Id { get; set; }
        public TeacherDTO? TeacherDTO { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Logo { get; set; }
        public bool? IsEnabled { get; set; }
        public bool? IsDeleted { get; set; }
    }
}