using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTO;
using StudyFlow.BLL.Interfaces;
using StudyFlow.BLL.Mapping;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _repository;
        private readonly IRepository<Institution> _repositoryInstitution;
        private readonly IRepository<Profile> _repositoryProfile;

        public UserService(IRepository<User> repository, IRepository<Institution> repositoryInstitution, IRepository<Profile> repositoryProfile)
        {
            _repository = repository;
            _repositoryInstitution = repositoryInstitution;
            _repositoryProfile = repositoryProfile;
        }

        public async Task<IActionResult> CreateUserAsync(UserDTO user)
        {
            var institution = await _repositoryInstitution.GetAsync(user.InstitutionID);

            if (institution == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found institution with the Id {user.InstitutionID}." });
            }

            var profile = await _repositoryProfile.GetAsync(user.ProfileId);

            if (profile == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found profile with the Id {user.ProfileId}." });
            }

            User userToCreate = user.ToEntity();
            userToCreate.Password = PasswordService.HashPassword(user.Password);
            userToCreate.Institution = institution;
            userToCreate.Profile = profile;
            userToCreate.Id = Guid.NewGuid();
            userToCreate.CreatedAt = DateTime.Now;
            userToCreate.UpdatedAt = DateTime.Now;
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
            var user = await _repository.GetAsync(id);

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
            return new OkObjectResult(await _repository.GetAllAsync());
        }

        public Task<IActionResult> GetUserByCourseAsync(int courseId)
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> GetUserByIdAsync(Guid id)
        {
            var user = await _repository.GetAsync(id);

            if (user == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found user with the Id {id}." });
            }

            return new OkObjectResult(user);
        }

        public async Task<IActionResult> GetUserByInstitutionAsync(int institutionId)
        {
            var users = await _repository.FindAsync(u => u.InstitutionID == institutionId);

            if (users == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found users with the Institution Id {institutionId}." });
            }

            return new OkObjectResult(users);
        }

        public async Task<IActionResult> UpdateUserAsync(UserDTO user)
        {
            var userToUpdate = await _repository.GetAsync(user.Id);

            if (userToUpdate == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found user with the Id {user.Id}." });
            }

            User userToModify = user.ToEntity();
            userToModify.UpdatedAt = DateTime.Now;
            var result = await _repository.UpdateAsync(userToModify);

            if (result == 0)
            {
                return new BadRequestObjectResult(new { Error = "Failed to update user." });
            }

            return new OkObjectResult(user);
        }
    }
}