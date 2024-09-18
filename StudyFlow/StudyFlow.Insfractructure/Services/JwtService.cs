using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using StudyFlow.Insfractructure.Entities;
using StudyFlow.Insfractructure.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StudyFlow.Insfractructure.Services
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;
        private string _secretKey;

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
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidAudience = _configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey))
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
                Issuer = _configuration.GetValue<string>("JwtConfig:Issuer"),
                Audience = _configuration.GetValue<string>("JwtConfig:Audience"),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private IEnumerable<Claim>? GenerateClaims(ClaimEntity claimEntity)
        {
            var claims = new List<Claim>();

            foreach (var profile in claimEntity.Roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, profile));
            }

            claims.Add(new Claim(ClaimTypes.NameIdentifier, claimEntity.Id.ToString()));

            return claims;
        }
    }
}