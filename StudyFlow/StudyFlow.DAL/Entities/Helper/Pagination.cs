namespace StudyFlow.DAL.Entities.Helper
{
    public class Pagination
    {
        public int Page { get; set; } = 1;
        public int RecordsNumber { get; set; } = 10;
        public string? Filter { get; set; }
    }
}