using Microsoft.Extensions.DependencyInjection;
using StudyFlow.Infrastructure.Entities;

namespace StudyFlow.Infrastructure.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(ClaimEntity claimEntity);

        void ConfigureJwtAuthentication(IServiceCollection services);
    }
}