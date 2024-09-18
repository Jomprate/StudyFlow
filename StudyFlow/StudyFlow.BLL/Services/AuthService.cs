using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.BLL.Interfaces;
using StudyFlow.BLL.Mapping;
using StudyFlow.DAL.Interfaces;
using StudyFlow.Insfractructure.Interfaces;
using System.IdentityModel.Tokens.Jwt;

namespace StudyFlow.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJwtService _jwtService;

        public AuthService(IUnitOfWork unitOfWork, IJwtService jwtService)
        {
            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
        }

        public async Task<string> LoginAsync(LoginDTO loginDTO)
        {
            var user = await _unitOfWork.UserRepository.GetUserByEmailWithProfileAsync(loginDTO.Email);

            if (user == null)
            {
                return string.Empty;
            }

            bool isvalid = PasswordService.VerifyPassword(user.Password, loginDTO.Password);

            if (isvalid)
            {
                user.IsOnline = true;
                var result = await _unitOfWork.UserRepository.UpdateAsync(user);

                if (!result)
                {
                    return string.Empty;
                }

                var userDto = user.ToGetDTO();
                return _jwtService.GenerateToken(new Insfractructure.Entities.ClaimEntity() { Id = user.Id, Roles = user.ListProfile.Select(s => s.Name), ExpirationDuration = "ExpiryDurationLogin" });
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
                var user = await _unitOfWork.UserRepository.GetByIdAsync(userId);

                if (user == null)
                {
                    return false;
                }

                user.IsOnline = false;
                var result = await _unitOfWork.UserRepository.UpdateAsync(user);

                if (!result)
                {
                    return true;
                }
            }

            return false;
        }

        public string RecoverPasswordByEmailAsync(Guid id)
        {
            try
            {
                return _jwtService.GenerateToken(new Insfractructure.Entities.ClaimEntity() { Id = id, ExpirationDuration = "ExpiryDurationRecovery" });
            }
            catch
            {
                throw;
            }
        }
    }
}