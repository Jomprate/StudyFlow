namespace StudyFlow.BLL.DTOS.ApiResponse
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public T Data { get; set; }
        public ApiError Error { get; set; }

        public ApiResponse(T data)
        {
            Success = true;
            Data = data;
            Error = null!;
        }

        public ApiResponse(ApiError error)
        {
            Success = false;
            Data = default!;
            Error = error;
        }
    }
}