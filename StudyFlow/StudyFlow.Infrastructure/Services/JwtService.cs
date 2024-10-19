using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using StudyFlow.Infrastructure.Entities;
using StudyFlow.Infrastructure.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StudyFlow.Infrastructure.Services
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;
        private static string? _secretKey;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureJwtAuthentication(IServiceCollection services)
        {
            var secretName = "JwtSecretKey";
            var serviceProvider = services.BuildServiceProvider();
            var keyVaultService = serviceProvider.GetService<IKeyVaultService>();

            if (keyVaultService == null)
            {
                throw new InvalidOperationException("IKeyVaultService is not registered in the service collection.");
            }

            _secretKey = keyVaultService.GetSecretAsync(secretName).Result;

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _configuration["JwtConfig:Issuer"],
                    ValidAudience = _configuration["JwtConfig:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey))
                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        // Log cuando se recibe un token
                        context.HttpContext.RequestServices
                            .GetRequiredService<ILogger<JwtBearerHandler>>()
                            .LogDebug("Token recibido: {Token}", context.Token);

                        return Task.CompletedTask;
                    },
                    OnAuthenticationFailed = context =>
                    {
                        // Log para errores de autenticación
                        context.HttpContext.RequestServices
                            .GetRequiredService<ILogger<JwtBearerHandler>>()
                            .LogError(context.Exception, "Error en la autenticación");

                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        // Log cuando el token se valida correctamente
                        context.HttpContext.RequestServices
                            .GetRequiredService<ILogger<JwtBearerHandler>>()
                            .LogInformation("Token validado correctamente");

                        return Task.CompletedTask;
                    },
                    OnChallenge = context =>
                    {
                        // Log cuando la autenticación falla y se lanza un challenge
                        context.HttpContext.RequestServices
                            .GetRequiredService<ILogger<JwtBearerHandler>>()
                            .LogWarning("Bearer fue desafiado (no autenticado): {Error}", context.Error);

                        return Task.CompletedTask;
                    }
                };
            });
        }

        public string GenerateToken(ClaimEntity claimEntity)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            if (_secretKey == null)
            {
                throw new ArgumentNullException("Secret key is null");
            }

            var key = Encoding.ASCII.GetBytes(_secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(GenerateClaims(claimEntity)),
                Expires = DateTime.UtcNow.AddMinutes(_configuration.GetValue<double>($"JwtConfig:{claimEntity.ExpirationDuration}")),
                NotBefore = DateTime.UtcNow,
                Issuer = _configuration.GetValue<string>("JwtConfig:Issuer"),
                Audience = _configuration.GetValue<string>("JwtConfig:Audience"),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private IEnumerable<Claim>? GenerateClaims(ClaimEntity claimEntity)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, claimEntity.Id.ToString()),
                new Claim(ClaimTypes.Role, claimEntity.Rol)
            };

            return claims;
        }
    }
}