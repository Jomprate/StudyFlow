﻿using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.Authenticate.Request;
using StudyFlow.BLL.DTOS.User;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;
using static StudyFlow.BLL.Services.UserService;

namespace StudyFlow.BLL.Interfaces
{
    public interface IUserService
    {
        Task<IActionResult> GetAllUsersAsync();

        Task<IActionResult> GetUserByIdAsync(Guid id);

        Task<IActionResult> GetUserByCourseAsync(Guid courseId);

        Task<IActionResult> CreateUserAsync(AddUserDTO user);

        Task<IActionResult> UpdateUserAsync(UpdateUserDTO user, string userId);

        Task<IActionResult> DeleteUserAsync(Guid id);

        Task<IActionResult> UpdatePasswordAsync(UpdatePasswordDTO updatePasswordDTO, string userId);

        Task<IActionResult> ConfirmMailUserTokenAsync(EmailConfirmationRequest request);

        Task<IActionResult> ResendConfirmEmailByEmailAsync(RecoverPasswordRequestDTO request);
    }
}