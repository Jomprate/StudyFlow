namespace StudyFlow.BLL.DTOS.Entities
{
    public class TeacherDTO
    {
        public Guid? Id { get; set; }
        public string? FullName { get; set; } = null!;
        public string? Photo { get; set; }
    }
}