namespace StudyFlow.BLL.DTOS.Entities
{
    public class ScheduledDTO
    {
        public Guid? Id { get; set; }
        public Guid? SubjectId { get; set; }
        public DateTime? ScheduledDate { get; set; }
    }
}