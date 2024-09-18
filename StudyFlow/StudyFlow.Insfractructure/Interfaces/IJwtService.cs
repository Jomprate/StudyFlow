using Microsoft.Extensions.DependencyInjection;
using StudyFlow.Insfractructure.Entities;

namespace StudyFlow.Insfractructure.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(ClaimEntity claimEntity);

        void ConfigureJwtAuthentication(IServiceCollection services);
    }
}