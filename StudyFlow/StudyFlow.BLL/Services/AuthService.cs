using Azure.Core;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.ApiResponse;
using StudyFlow.BLL.DTOS.Authenticate.Request;
using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.BLL.Interfaces;
using StudyFlow.BLL.Mapping;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;
using StudyFlow.DAL.Services;
using StudyFlow.Infrastructure.Interfaces;
using StudyFlow.Infrastructure.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Policy;

namespace StudyFlow.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJwtService _jwtService;
        private readonly IMailService _mailService;

        public AuthService(IUnitOfWork unitOfWork, IJwtService jwtService, IMailService mailService)
        {
            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
            _mailService = mailService;
        }

        public async Task<string> LoginAsync(LoginDTO loginDTO)
        {
            var result = await _unitOfWork.UserRepository.LoginAsync(loginDTO.Email, loginDTO.Password);

            if (result == null)
            {
                return string.Empty;
            }

            if (result.IsLockedOut)
            {
                return "The account is locked out for many failed attempts";
            }
            else if (!result.Succeeded)
            {
                return "The email or the password is invalid. Try again.";
            }

            User user = await _unitOfWork.UserRepository.GetUserByEmailAsync(loginDTO.Email);

            user.IsOnline = true;
            var update = await _unitOfWork.UserRepository.UpdateAsync(user);

            if (!update)
            {
                return string.Empty;
            }

            var userDto = user.ToGetDTO();
            return _jwtService.GenerateToken(new Infrastructure.Entities.ClaimEntity() { Id = user.Id, Rol = user.UserType.ToString(), ExpirationDuration = "ExpiryDurationLogin" });
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

        public async Task<IActionResult> RecoverPasswordByEmailAsync(RecoverPasswordRequestDTO recoverPasswordRequestDTO)
        {
            var user = await _unitOfWork.UserRepository.GetUserByEmailAsync(recoverPasswordRequestDTO.Email);

            if (user == null || !(await _unitOfWork.UserRepository.IsEmailConfirmedAsync(user)))
            {
                return ApiResponseHelper.BadRequest("User does not exist or email is not confirmed.");
            }

            var token = await _unitOfWork.UserRepository.GeneratePasswordResetTokenAsync(user);
            string encodedToken = WebUtility.UrlEncode(token);
            string confirmationLink = $"http://localhost:5173/confirmpage?token={encodedToken}";

            try
            {
                string emailBody = string.Format(Message_Constants.EmailBodyForgotPassword, confirmationLink);
                await _mailService.SendMailAsync(user.Email, "Recovery Password", emailBody);
                return ApiResponseHelper.Success("Reset link has been sent to your email.");
            }
            catch
            {
                throw;
            }
        }

        public async Task<IActionResult> ResetPasswordAsync(ResetPasswordRequestDTO resetPasswordDTO)
        {
            var user = await _unitOfWork.UserRepository.GetUserByEmailAsync(resetPasswordDTO.Email);
            if (user == null)
            {
                return ApiResponseHelper.BadRequest("The Email dont is register.");
            }

            var result = await _unitOfWork.UserRepository.ResetPasswordAsync(user, WebUtility.UrlDecode(resetPasswordDTO.Token), resetPasswordDTO.NewPassword);
            if (result.Succeeded)
            {
                return ApiResponseHelper.Success("Password has been reset.");
            }

            return ApiResponseHelper.BadRequest(result.Errors.FirstOrDefault().Description);
        }
    }
}