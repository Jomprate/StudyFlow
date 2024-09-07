using Newtonsoft.Json.Linq;
using StudyFlow.BLL.DTOS;
using StudyFlow.BLL.Interfaces;
using StudyFlow.BLL.Mapping;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _repositoryUser;
        private readonly IJwtService _jwtService;

        public AuthService(IUserRepository repositoryUser, IJwtService jwtService)
        {
            _repositoryUser = repositoryUser;
            _jwtService = jwtService;
        }

        public async Task<string> LoginAsync(LoginDTO loginDTO)
        {
            var user = await _repositoryUser.GetUserByEmailWithProfileAsync(loginDTO.Email);

            if (user == null)
            {
                return string.Empty;
            }

            bool isvalid = PasswordService.VerifyPassword(user.Password, loginDTO.Password);

            if (isvalid)
            {
                user.IsOnline = true;
                var result = await _repositoryUser.UpdateAsync(user);

                if (result == null)
                {
                    return string.Empty;
                }

                var userDto = user.ToGetDTO();
                return _jwtService.GenerateToken(user, userDto.listProfile);
            }
            return string.Empty;
        }

        public async Task<bool> LogoutAsync(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "nameid");

            if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var userId))
            {
                var user = await _repositoryUser.GetByIdAsync(userId);
                if (user == null)
                {
                    return false;
                }

                user.IsOnline = false;
                var Result = await _repositoryUser.UpdateAsync(user);

                if (Result != null)
                {
                    return true;
                }
            }

            return false;
        }

        public Task<bool> RecoverPasswordByEmailAsync(string email)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ResetPasswordAsync(Guid idUser, string newPassword)
        {
            throw new NotImplementedException();
        }
    }
}