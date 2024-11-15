namespace StudyFlow.BLL.DTOS.Entities
{
    public class SubjectDTO
    {
        public Guid? Id { get; set; }
        public CourseDTO? Course { get; set; }
        public string? Name { get; set; } = null!;
        public string HtmlContent { get; set; } = null!;
        public string? Type { get; set; } = null!;
        public string? Link { get; set; }
        public ScheduledDTO? ListScheduleds { get; set; }
    }
}