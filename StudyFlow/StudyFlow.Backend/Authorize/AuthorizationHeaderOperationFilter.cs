using Microsoft.OpenApi.Models;
using StudyFlow.Backend.Authorize;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace StudyFlow.BLL.Services
{
    public class AuthorizationHeaderOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            // Verifica si el método tiene el atributo que indica que debe tener el encabezado Authorization
            if (context.MethodInfo.CustomAttributes.Any(attr => attr.AttributeType == typeof(AuthorizeHeaderAttribute)))
            {
                operation.Parameters ??= new List<OpenApiParameter>();
                operation.Parameters.Add(new OpenApiParameter
                {
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Description = "JWT Bearer token",
                    Required = false // Puedes cambiar esto a true si el encabezado es obligatorio
                });
            }
        }
    }
}