using StudyFlow.BLL.DTO;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var user = await _repositoryUser.GetUserWithProfileAsync(loginDTO.Email);

            if (user == null)
            {
                return string.Empty;
            }

            bool isvalid = PasswordService.VerifyPassword(user.Password, loginDTO.Password);

            if (isvalid)
            {
                return _jwtService.GenerateToken(user, user.Profile);
            }
            return string.Empty;
        }

        public Task<bool> LogoutAsync()
        {
            throw new NotImplementedException();
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