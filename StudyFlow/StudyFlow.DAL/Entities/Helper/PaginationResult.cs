namespace StudyFlow.DAL.Entities.Helper
{
    public class PaginationResult<T> where T : class
    {
        public IEnumerable<T> ListResult { get; set; } = null!;
        public int TotalRecords { get; set; } = 0;
        public int TotalPages { get; set; } = 0;
        public Pagination Pagination { get; set; } = null!;
    }
}