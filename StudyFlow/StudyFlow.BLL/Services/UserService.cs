using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudyFlow.BLL.DTOS.ApiResponse;
using StudyFlow.BLL.DTOS.User;
using StudyFlow.BLL.Interfaces;
using StudyFlow.BLL.Mapping;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;
using StudyFlow.Infrastructure.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IStorageService _storageService;
        private readonly IMailService _mailService;

        public UserService(IUnitOfWork unitOfWork, IStorageService blobStorage, IMailService mailService)
        {
            _unitOfWork = unitOfWork;
            _storageService = blobStorage;
            _mailService = mailService;
        }

        public async Task<IActionResult> CreateUserAsync(AddUserDTO user)
        {
            try
            {
                var exist = await _unitOfWork.CountryRepository.AnyAsync(w => w.Id == user.CountryId);

                if (!exist)
                {
                    return ApiResponseHelper.NotFound($"Not found country with the Id {user.CountryId}.");
                }

                exist = await _unitOfWork.UserRepository.AnyAsync(w => w.Email == user.Email);

                if (exist)
                {
                    return new BadRequestObjectResult("User with this email already exists.");
                }

                User userToCreate = user.ToEntity();
                userToCreate.IsEnabled = false;
                userToCreate.HaveProfilePicture = !string.IsNullOrEmpty(user.ProfilePicture);
                User newUser = await _unitOfWork.UserRepository.RegisterAsync(userToCreate, user.Password);

                if (newUser == null)
                {
                    return new BadRequestObjectResult("Failed to create user.");
                }

                if (!string.IsNullOrEmpty(user.ProfilePicture))
                {
                    bool uploaded = await _storageService.UploadAsync(user.ProfilePicture, newUser.Id.ToString());
                    if (!uploaded)
                    {
                        return new BadRequestObjectResult("Failed to upload profile picture.");
                    }
                }

                var result = await _unitOfWork.SaveChangesAsync();
                string token = await _unitOfWork.UserRepository.GenerateEmailConfirmationTokenAsync(newUser);

                try
                {
                    _mailService.SendMailAsync(user.Email, "Welcome to StudyFlow", "You have successfully registered to StudyFlow." + token);
                }
                catch
                {
                }

                if (result > 0)
                {
                    return ApiResponseHelper.Create("User created successfully.");
                }
                else
                {
                    return new BadRequestObjectResult("Failed to create user.");
                }
            }
            catch (DbUpdateException ex)
            {
                return new BadRequestObjectResult($"Error saving user to the database. Details: {ex.InnerException?.Message}");
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                return new BadRequestObjectResult($"An unexpected error occurred: {ex.Message}");
            }
        }

        public async Task<IActionResult> DeleteUserAsync(Guid id)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(id);

            if (user == null)
            {
                return ApiResponseHelper.NotFound($"Not found user with the Id {id}.");
            }

            await _unitOfWork.UserRepository.DeleteAsync(user);
            bool result = _unitOfWork.SaveChangesAsync().Result > 0;

            if (result)
            {
                return ApiResponseHelper.Success("User deleted successfully");
            }
            else
            {
                throw new ArgumentException("Failed to delete user");
            }
        }

        public async Task<IActionResult> GetAllUsersAsync()
        {
            try
            {
                var users = await _unitOfWork.UserRepository.GetAllAsync();

                if (users == null || !users.Any())
                {
                    return ApiResponseHelper.NotFound("No users found.");
                }

                var userDtos = new List<GetUserDTO>();

                foreach (var user in users)
                {
                    string? profilePicture = user.HaveProfilePicture
                        ? await _storageService.DownloadAsync(user.Id.ToString())
                        : null;

                    userDtos.Add(new GetUserDTO
                    {
                        Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        ProfilePicture = profilePicture,
                        IsEnabled = user.IsEnabled,
                        IsOnline = user.IsOnline,
                        Country = user.Country
                    });
                }

                return ApiResponseHelper.Success(userDtos);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult($"An unexpected error occurred: {ex.Message}");
            }
        }

        public async Task<IActionResult> GetUserByCourseAsync(Guid courseId)
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> GetUserByIdAsync(Guid id)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(id);

            if (user == null)
            {
                return ApiResponseHelper.NotFound($"Not found user with the Id {id}.");
            }

            string? profilePicture = user.HaveProfilePicture
                ? await _storageService.DownloadAsync(user.Id.ToString())
                : null;

            var userDto = new GetUserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                ProfilePicture = profilePicture,
                IsEnabled = user.IsEnabled,
                IsOnline = user.IsOnline,
                Country = user.Country
            };

            return ApiResponseHelper.Success(userDto);
        }

        public async Task<IActionResult> UpdateUserAsync(UpdateUserDTO user)
        {
            bool exist = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == user.Id);
            if (exist)
            {
                return ApiResponseHelper.NotFound($"Not found user with the Id {user.Id}.");
            }

            var userToUpdate = user.ToEntity();
            await _unitOfWork.UserRepository.UpdateAsync(userToUpdate);
            var result = _unitOfWork.SaveChangesAsync();

            if (userToUpdate.HaveProfilePicture)
            {
                _storageService.UploadAsync(user.ProfilePicture, user.Id.ToString());
            }

            if (result != null)
            {
                return ApiResponseHelper.Success("User updated successfully.");
            }
            else
            {
                return new BadRequestObjectResult("Failed to update user.");
            }
        }

        public async Task<IActionResult> ConfirmMailUserTokenAsync(Guid userId, string token)
        {
            User user = await _unitOfWork.UserRepository.GetByIdAsync(userId);

            if (user == null)
            {
                return ApiResponseHelper.NotFound($"Not found user with the Id {userId}.");
            }

            user.IsEnabled = true;
            var result = await _unitOfWork.UserRepository.ConfirmEmailAsync(user, token);
            if (result != null)
            {
                return ApiResponseHelper.Success("Email confirmed successfully.");
            }
            else
            {
                return new BadRequestObjectResult("Failed to confirm email.");
            }
        }
    }
}