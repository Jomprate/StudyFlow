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
            List<Profile> listProfile = new List<Profile>();
            Profile profile = await _unitOfWork.ProfileRepository.GetByIdAsync(user.listProfileId.FirstOrDefault());

            if (profile == null)
            {
                return ApiResponseHelper.NotFound($"Not found profile with the Id {user.listProfileId.FirstOrDefault()}.");
            }

            var country = await _unitOfWork.CountryRepository.GetByIdAsync(user.CountryId);

            if (country == null)
            {
                return ApiResponseHelper.NotFound($"Not found country with the Id {user.CountryId}.");
            }

            User userToCreate = user.ToEntity();
            listProfile.Add(profile);
            userToCreate.Password = PasswordService.HashPassword(user.Password);
            userToCreate.ListProfile = listProfile;
            userToCreate.Id = Guid.NewGuid();
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
            var users = await _unitOfWork.UserRepository.GetUsersWithProfileAsync();

            return ApiResponseHelper.Success(users.ToGetDTO());
        }

        public async Task<IActionResult> GetUserByCourseAsync(Guid courseId)
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> GetUserByIdAsync(Guid id)
        {
            var user = await _unitOfWork.UserRepository.GetUserByIdWithProfileAsync(id);

            if (user == null)
            {
                return ApiResponseHelper.NotFound($"Not found user with the Id {id}.");
            }

            string profilePicture = user.HaveProfilePicture ? await _blobStorage.DownloadAsync(user.Id.ToString()) : string.Empty;
            GetUserDTO getUserDTO = user.ToGetDTO();
            getUserDTO.ProfilePicture = profilePicture;

            return ApiResponseHelper.Success(getUserDTO);
        }

        public async Task<IActionResult> UpdateUserAsync(UpdateUserDTO user)
        {
            var userToUpdate = await _unitOfWork.UserRepository.GetUserByIdWithProfileAsync(user.Id);

            if (userToUpdate == null)
            {
                return ApiResponseHelper.NotFound($"Not found user with the Id {user.Id}.");
            }

            Profile profile = await _unitOfWork.ProfileRepository.GetByIdAsync(user.listProfileId.FirstOrDefault());

            if (profile == null)
            {
                return ApiResponseHelper.NotFound($"Not found profile with the Id {user.listProfileId.FirstOrDefault()}.");
            }

            Country country = await _unitOfWork.CountryRepository.GetByIdAsync(userToUpdate.CountryId);

            if (country == null)
            {
                return ApiResponseHelper.NotFound($"Not found country with the Id {user.CountryId}.");
            }

            userToUpdate.FirstName = string.IsNullOrEmpty(userToUpdate.FirstName) ? userToUpdate.FirstName : user.FirstName;
            userToUpdate.LastName = string.IsNullOrEmpty(userToUpdate.LastName) ? userToUpdate.LastName : user.LastName;
            userToUpdate.PhoneNumber = string.IsNullOrEmpty(userToUpdate.PhoneNumber) ? userToUpdate.PhoneNumber : user.PhoneNumber;
            userToUpdate.IsEnabled = user.IsEnabled;
            userToUpdate.Password = string.IsNullOrEmpty(userToUpdate.Password) ? userToUpdate.Password : PasswordService.HashPassword(user.Password);
            AssignProfile(ref userToUpdate, profile);
            userToUpdate.HaveProfilePicture = string.IsNullOrEmpty(user.ProfilePicture) ? false : true;
            await _unitOfWork.UserRepository.UpdateAsync(userToUpdate);
            var blobFile = userToUpdate.HaveProfilePicture ? await _blobStorage.UploadAsync(user.ProfilePicture, userToUpdate.Id.ToString()) : await _blobStorage.DeleteAsync(userToUpdate.Id.ToString());
            var result = await _unitOfWork.SaveChangesAsync();

            return result != null && result > 0
                ? ApiResponseHelper.Create("User updated")
                : throw new ArgumentException("Failed to update user.");
        }

        private void AssignProfile(ref User userToUpdate, Profile profile)
        {
            foreach (var existingProfile in userToUpdate.ListProfile.ToList())
            {
                if (!existingProfile.Id.Equals(profile.Id))
                {
                    userToUpdate.ListProfile.Remove(existingProfile);
                }
            }

            foreach (var profileId in userToUpdate.ListProfile.Select(s => s.Id))
            {
                if (!userToUpdate.ListProfile.Any(p => p.Id == profileId))
                {
                    if (profile != null)
                    {
                        userToUpdate.ListProfile.Add(profile);
                    }
                }
            }

            if (!userToUpdate.ListProfile.Any())
            {
                userToUpdate.ListProfile.Add(profile);
            }
        }
    }
}