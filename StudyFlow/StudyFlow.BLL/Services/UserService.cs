using Microsoft.AspNetCore.Mvc;
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
            var country = await _unitOfWork.CountryRepository.GetByIdAsync(user.CountryId);

            if (country == null)
            {
                return ApiResponseHelper.NotFound($"Not found country with the Id {user.CountryId}.");
            }

            User userToCreate = user.ToEntity();
            userToCreate.PasswordHash = PasswordService.HashPassword(user.Password);
            userToCreate.HaveProfilePicture = string.IsNullOrEmpty(user.ProfilePicture) ? false : true;
            User newUser = await _unitOfWork.UserRepository.CreateAsync(userToCreate);
            bool uploaded = await _blobStorage.UploadAsync(user.ProfilePicture, newUser.Id.ToString());
            var result = uploaded ? _unitOfWork.SaveChangesAsync() : null;

            if (result != null && result.Result > 0)
            {
                return ApiResponseHelper.Create("User created");
            }
            else
            {
                throw new ArgumentException("Failed to create user.");
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
            throw new NotImplementedException();
        }

        public async Task<IActionResult> GetUserByCourseAsync(Guid courseId)
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> GetUserByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> UpdateUserAsync(UpdateUserDTO user)
        {
            throw new NotImplementedException();
        }
    }
}