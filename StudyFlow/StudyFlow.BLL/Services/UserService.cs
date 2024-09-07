using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StudyFlow.BLL.DTOS;
using StudyFlow.BLL.Interfaces;
using StudyFlow.BLL.Mapping;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;
using System.Linq;

namespace StudyFlow.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IRepository<Profile> _repositoryProfile;
        private readonly IRepository<Country> _repositoryCountry;

        public UserService(IUserRepository repository, IRepository<Profile> repositoryProfile, IRepository<Country> repositoryCountry)
        {
            _repository = repository;
            _repositoryProfile = repositoryProfile;
            _repositoryCountry = repositoryCountry;
        }

        public async Task<IActionResult> CreateUserAsync(AddUserDTO user)
        {
            List<Profile> listProfile = new List<Profile>();
            Profile profile = await _repositoryProfile.GetByIdAsync(user.listProfileId.FirstOrDefault());

            if (profile == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found profile with the Id {user.listProfileId.FirstOrDefault()}." });
            }

            var listCountry = await _repositoryCountry.GetAllAsync();
            Country country = listCountry.FirstOrDefault(c => c.Id == user.CountryId);

            if (country == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found country with the Id {user.CountryId}." });
            }

            User userToCreate = user.ToEntity();
            listProfile.Add(profile);
            userToCreate.Password = PasswordService.HashPassword(user.Password);
            userToCreate.ListProfile = listProfile;
            userToCreate.Id = Guid.NewGuid();
            var result = await _repository.CreateAsync(userToCreate);

            if (result != null)
            {
                return new CreatedResult("", "User created");
            }
            else
            {
                return new BadRequestObjectResult(new { Error = "Failed to create user." });
            }
        }

        public async Task<IActionResult> DeleteUserAsync(Guid id)
        {
            var user = await _repository.GetByIdAsync(id);

            if (user == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found user with the Id {id}." });
            }

            int result = await _repository.DeleteAsync(user);

            if (result > 0)
            {
                return new OkObjectResult(new { Message = "User deleted successfully" });
            }
            else
            {
                return new BadRequestObjectResult(new { Message = "Failed to delete user" });
            }
        }

        public async Task<IActionResult> GetAllUsersAsync()
        {
            var users = await _repository.GetUsersWithProfileAsync();

            return new OkObjectResult(users.ToGetDTO());
        }

        public async Task<IActionResult> GetUserByCourseAsync(Guid courseId)
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> GetUserByIdAsync(Guid id)
        {
            var user = await _repository.GetUserByIdWithProfileAsync(id);

            if (user == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found user with the Id {id}." });
            }

            return new OkObjectResult(user.ToGetDTO());
        }

        public async Task<IActionResult> UpdateUserAsync(UpdateUserDTO user)
        {
            var userToUpdate = await _repository.GetUserByIdWithProfileAsync(user.Id);

            if (userToUpdate == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found user with the Id {user.Id}." });
            }

            Profile profile = await _repositoryProfile.GetByIdAsync(user.listProfileId.FirstOrDefault());

            if (profile == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found profile with the Id {user.listProfileId.FirstOrDefault()}." });
            }

            var listCountry = await _repositoryCountry.GetAllAsync();
            Country country = listCountry.FirstOrDefault(c => c.Id == user.CountryId);

            if (country == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found country with the Id {user.CountryId}." });
            }

            userToUpdate.FirstName = userToUpdate.FirstName.IsNullOrEmpty() ? userToUpdate.FirstName : user.FirstName;
            userToUpdate.LastName = userToUpdate.LastName.IsNullOrEmpty() ? userToUpdate.LastName : user.LastName;
            userToUpdate.PhoneNumber = userToUpdate.PhoneNumber.IsNullOrEmpty() ? userToUpdate.PhoneNumber : user.PhoneNumber;
            userToUpdate.ProfilePicture = userToUpdate.ProfilePicture.IsNullOrEmpty() ? userToUpdate.ProfilePicture : user.ProfilePicture;
            userToUpdate.IsEnabled = user.IsEnabled;
            userToUpdate.Password = userToUpdate.Password.IsNullOrEmpty() ? userToUpdate.Password : PasswordService.HashPassword(user.Password);
            AssignProfile(ref userToUpdate, profile);
            var result = await _repository.UpdateAsync(userToUpdate);

            if (result != null)
            {
                return new CreatedResult("", "User updated");
            }
            else
            {
                return new BadRequestObjectResult(new { Error = "Failed to update user." });
            }
        }

        private void AssignProfile(ref User userToUpdate, Profile profile)
        {
            // Find and remove any existing profiles that are not in the updated list
            foreach (var existingProfile in userToUpdate.ListProfile.ToList())
            {
                if (!existingProfile.Id.Equals(profile.Id))
                {
                    userToUpdate.ListProfile.Remove(existingProfile);
                }
            }

            // Add new profiles to the user
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

            // Add the new profile to the user if it doesn't already exist
            if (!userToUpdate.ListProfile.Any())
            {
                userToUpdate.ListProfile.Add(profile);
            }
        }
    }
}