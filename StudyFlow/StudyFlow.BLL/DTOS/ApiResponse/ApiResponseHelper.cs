using Microsoft.AspNetCore.Mvc;

namespace StudyFlow.BLL.DTOS.ApiResponse
{
    public static class ApiResponseHelper
    {
        public static IActionResult Success<T>(T data)
        {
            return new OkObjectResult(new ApiResponse<T>(data));
        }

        public static IActionResult NotFound(string message, string detail = null)
        {
            return new NotFoundObjectResult(new ApiResponse<object>(new ApiError(message, detail)));
        }

        public static IActionResult BadRequest(string message, string detail = null)
        {
            return new BadRequestObjectResult(new ApiResponse<object>(new ApiError(message, detail)));
        }

        public static IActionResult InternalServerError(string message, string detail = null)
        {
            return new ObjectResult(new ApiResponse<object>(new ApiError(message, detail)))
            {
                StatusCode = 500
            };
        }

        public static IActionResult Create<T>(T data)
        {
            return new CreatedResult(string.Empty, new ApiResponse<T>(data));
        }

        public static IActionResult NoContent()
        {
            return new NoContentResult();
        }
    }
}