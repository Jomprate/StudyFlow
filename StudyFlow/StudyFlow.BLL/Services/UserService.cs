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
        private readonly IBlobStorage _blobStorage;

        public UserService(IUnitOfWork unitOfWork, IBlobStorage blobStorage)
        {
            _unitOfWork = unitOfWork;
            _blobStorage = blobStorage;
        }

        public async Task<IActionResult> CreateUserAsync(AddUserDTO user)
        {
            try
            {
                var country = await _unitOfWork.CountryRepository.GetByIdAsync(user.CountryId);
                if (country == null)
                {
                    return ApiResponseHelper.NotFound($"Not found country with the Id {user.CountryId}.");
                }

                User userToCreate = user.ToEntity();
                userToCreate.PasswordHash = PasswordService.HashPassword(user.Password);

                userToCreate.HaveProfilePicture = !string.IsNullOrEmpty(user.ProfilePicture);

                User newUser = await _unitOfWork.UserRepository.CreateAsync(userToCreate);

                if (!string.IsNullOrEmpty(user.ProfilePicture))
                {
                    bool uploaded = await _blobStorage.UploadAsync(user.ProfilePicture, newUser.Id.ToString());
                    if (!uploaded)
                    {
                        return new BadRequestObjectResult("Failed to upload profile picture.");
                    }
                }

                var result = await _unitOfWork.SaveChangesAsync();

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

            bool result = await _unitOfWork.UserRepository.DeleteAsync(user);

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
                        ? await _blobStorage.DownloadAsync(user.Id.ToString())
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
                ? await _blobStorage.DownloadAsync(user.Id.ToString())
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
            throw new NotImplementedException();
        }
    }
}