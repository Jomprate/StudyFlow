using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _repository;

        public UserService(IRepository<User> repository)
        {
            _repository = repository;
        }

        public async Task<IActionResult> CreateUserAsync(User user)
        {
            user.Password = PasswordService.HashPassword(user.Password);
            var result = await _repository.CreateAsync(user);

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

        public async Task<IActionResult> UpdateUserAsync(User user)
        {
            var userToUpdate = await _repository.GetAsync(user.Id);

            if (userToUpdate == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found user with the Id {user.Id}." });
            }

            var result = await _repository.UpdateAsync(user);

            if (result == 0)
            {
                return new BadRequestObjectResult(new { Error = "Failed to update user." });
            }

            return new OkObjectResult(user);
        }
    }
}