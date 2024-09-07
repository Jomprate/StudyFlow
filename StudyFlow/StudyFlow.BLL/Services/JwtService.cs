using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StudyFlow.BLL.DTOS;
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
        private readonly string? _secretKey;
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

        public string GenerateToken(User user, IEnumerable<ProfileDTO> profiles)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            if (_secretKey == null)
            {
                throw new ArgumentNullException("Secret key is null");
            }

            var key = Encoding.ASCII.GetBytes(_secretKey);

            var claims = new List<Claim>();
            foreach (var profile in profiles)
            {
                claims.Add(new Claim(ClaimTypes.Role, profile.Name));
            }
            claims.Add(new Claim(ClaimTypes.Name, user.FirstName + ' ' + user.LastName));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
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