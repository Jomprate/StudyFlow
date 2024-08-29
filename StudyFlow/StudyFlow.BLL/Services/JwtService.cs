using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.BLL.Services
{
    public class JwtService : IJwtService
    {
        private readonly string _secretKey;
        private readonly int _expiryDuration;
        private string? _issuerConfiguration;
        private readonly string? _audienceConfiguration;

        public JwtService(IConfiguration config)
        {
            _secretKey = config.GetValue<string>("JwtConfig:SecretKey");
            _expiryDuration = config.GetValue<int>("JwtConfig:ExpiryDuration");
            _issuerConfiguration = config.GetValue<string>("JwtConfig:Issuer");
            _audienceConfiguration = config.GetValue<string>("JwtConfig:Audience");
        }

        public string GenerateToken(User user, Profile profile)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, profile.Name),
            }),
                Expires = DateTime.UtcNow.AddMinutes(_expiryDuration),
                Issuer = _issuerConfiguration,
                Audience = _audienceConfiguration,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}