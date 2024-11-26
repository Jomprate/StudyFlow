using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudyFlow.BLL.DTOS.ApiResponse;
using StudyFlow.BLL.DTOS.Authenticate.Request;
using StudyFlow.BLL.DTOS.User;
using StudyFlow.BLL.Interfaces;
using StudyFlow.BLL.Mapping;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Enumeration;
using StudyFlow.DAL.Interfaces;
using StudyFlow.DAL.Services;
using StudyFlow.Infrastructure.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IStorageService _storageService;
        private readonly IMailService _mailService;
        private readonly UserManager<User> _userManager;

        public UserService(IUnitOfWork unitOfWork, IStorageService blobStorage, IMailService mailService, UserManager<User> userManager)
        {
            _unitOfWork = unitOfWork;
            _storageService = blobStorage;
            _mailService = mailService;
            _userManager = userManager;
        }

        public async Task<IActionResult> CreateUserAsync(AddUserDTO user)
        {
            try
            {
                var countryExists = await _unitOfWork.CountryRepository.AnyAsync(w => w.Id == user.CountryId);
                if (!countryExists)
                {
                    return ApiResponseHelper.NotFound($"Not found country with the Id {user.CountryId}.");
                }

                var emailExists = await _unitOfWork.UserRepository.AnyAsync(w => w.Email == user.Email);
                if (emailExists)
                {
                    return new BadRequestObjectResult("User with this email already exists.");
                }

                User userToCreate = user.ToEntity();
                userToCreate.HaveProfilePicture = !string.IsNullOrEmpty(user.ProfilePicture);
                User newUser = await _unitOfWork.UserRepository.RegisterAsync(userToCreate, user.Password);

                if (newUser == null)
                {
                    return new BadRequestObjectResult("Failed to create user.");
                }

                if (!string.IsNullOrEmpty(user.ProfilePicture))
                {
                    await _storageService.UploadAsync(user.ProfilePicture, newUser.Id.ToString());
                }

                var result = await _unitOfWork.SaveChangesAsync();

                if (result <= 0)
                {
                    var checkUser = await _unitOfWork.UserRepository.GetByIdAsync(newUser.Id);
                    if (checkUser == null)
                    {
                        return new BadRequestObjectResult("Failed to save user after creation.");
                    }
                }

                string token = await _unitOfWork.UserRepository.GenerateEmailConfirmationTokenAsync(newUser);

                string encodedToken = Uri.EscapeDataString(token);
                string encodedUserId = Uri.EscapeDataString(newUser.Id.ToString());

                string confirmationLink = $"http://localhost:5173/confirmpage?userId={encodedUserId}&token={encodedToken}";

                try
                {
                    string emailBody = string.Format(Message_Constants.EmailBodyConfirmation, confirmationLink);

                    await _mailService.SendMailAsync(user.Email, "Welcome to StudyFlow", emailBody);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error sending email: {ex.Message}");
                }

                return ApiResponseHelper.Create(new { Message = "User created successfully.", UserId = newUser.Id });
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
                        IsOnline = user.IsOnline,
                        Country = user.CountryId
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
            bool courseExists = await _unitOfWork.CourseRepository.AnyAsync(w => w.Id == courseId);
            if (!courseExists)
            {
                return ApiResponseHelper.NotFound($"Not found course with the Id {courseId}.");
            }

            var enrollments = await _unitOfWork.EnrollmentRepository.GetEnrollmentsByCourseIdAsync(courseId);
            var userIds = enrollments.Select(e => e.StudentId).ToList();
            var users = await _unitOfWork.UserRepository.FindAsync(f => userIds.Contains(f.Id));

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
                    IsOnline = user.IsOnline,
                    Country = user.CountryId
                });
            }

            return ApiResponseHelper.Success(userDtos);
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
                IsOnline = user.IsOnline,
                Country = user.CountryId
            };

            return ApiResponseHelper.Success(userDto);
        }

        public async Task<IActionResult> UpdateUserAsync(UpdateUserDTO user, string userId)
        {
            if (user.Id != Guid.Parse(userId))
            {
                return ApiResponseHelper.BadRequest("The user to modify must be the same in the token.");
            }

            bool exist = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == user.Id);
            if (!exist)
            {
                return ApiResponseHelper.NotFound($"Not found user with the Id {user.Id}.");
            }

            User userEntity = await _unitOfWork.UserRepository.GetByIdAsync(user.Id);

            // Actualizar campos del usuario
            userEntity.FirstName = user.FirstName;
            userEntity.LastName = user.LastName;
            userEntity.PhoneNumber = user.PhoneNumber;
            userEntity.CountryId = user.CountryId;
            userEntity.HaveProfilePicture = !string.IsNullOrEmpty(user.ProfilePicture);
            userEntity.UserType = Enum.Parse<UserTypeEnum>(user.ProfileId.ToString());

            // Guardar cambios en el repositorio
            await _unitOfWork.UserRepository.UpdateAsync(userEntity);
            var result = await _unitOfWork.SaveChangesAsync();

            // Subir la imagen solo si `ProfilePicture` tiene contenido
            if (!string.IsNullOrWhiteSpace(user.ProfilePicture))
            {
                await _storageService.UploadAsync(user.ProfilePicture, user.Id.ToString());
            }

            // Confirmar la actualización exitosa
            if (result > 0)
            {
                return ApiResponseHelper.Success("User updated successfully.");
            }
            else
            {
                return new BadRequestObjectResult("Failed to update user.");
            }
        }

        public class EmailConfirmationRequest
        {
            public Guid UserId { get; set; }
            public string Token { get; set; }
        }

        [HttpPost("ConfirmEmail")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ConfirmMailUserTokenAsync(EmailConfirmationRequest request)
        {
            try
            {
                // Validar el userId
                if (request.UserId == Guid.Empty || string.IsNullOrEmpty(request.Token))
                {
                    return ApiResponseHelper.BadRequest("Invalid userId or token.");
                }

                // Obtener el usuario por Id
                User user = await _unitOfWork.UserRepository.GetByIdAsync(request.UserId);

                if (user == null)
                {
                    return ApiResponseHelper.NotFound($"User with Id {request.UserId} not found.");
                }

                // Lógica para confirmar el email y validar el token
                var result = await _unitOfWork.UserRepository.ConfirmEmailAsync(user, request.Token);

                if (result.Succeeded)
                {
                    await _unitOfWork.SaveChangesAsync();  // Guardar cambios

                    return ApiResponseHelper.Success("Email confirmed successfully.");
                }
                else
                {
                    return ApiResponseHelper.BadRequest("Failed to confirm email. Invalid or expired token.");
                }
            }
            catch (Exception ex)
            {
                return ApiResponseHelper.InternalServerError("An unexpected error occurred", ex.Message);
            }
        }

        public async Task<IActionResult> ResendConfirmEmailByEmailAsync(RecoverPasswordRequestDTO request)
        {
            var user = await _unitOfWork.UserRepository.GetUserByEmailAsync(request.Email);

            if (user == null)
            {
                return ApiResponseHelper.NotFound($"User with email {request.Email} not found.");
            }

            if (user.EmailConfirmed)
            {
                return ApiResponseHelper.BadRequest("Email already confirmed.");
            }

            string token = await _unitOfWork.UserRepository.GenerateEmailConfirmationTokenAsync(user);

            string encodedToken = Uri.EscapeDataString(token);
            string encodedUserId = Uri.EscapeDataString(user.Id.ToString());

            string confirmationLink = $"http://localhost:5173/confirmpage?userId={encodedUserId}&token={encodedToken}";

            try
            {
                string emailBody = string.Format(Message_Constants.EmailBodyConfirmation, confirmationLink);

                await _mailService.SendMailAsync(user.Email, "Welcome to StudyFlow", emailBody);

                return ApiResponseHelper.Success("Confirmation email sent successfully.");
            }
            catch (Exception ex)
            {
                return ApiResponseHelper.BadRequest("Failed to send confirmation email.");
            }
        }

        public async Task<IActionResult> UpdatePasswordAsync(UpdatePasswordDTO request, string userId)
        {
            try
            {
                if (request.UserId != Guid.Parse(userId))
                {
                    return ApiResponseHelper.BadRequest("The user to modify must be the same as in the token.");
                }

                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return ApiResponseHelper.NotFound($"User with ID {request.UserId} not found.");
                }

                var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.CurrentPassword);
                if (!isPasswordValid)
                {
                    return ApiResponseHelper.BadRequest("Current password is incorrect.");
                }

                if (request.NewPassword != request.ConfirmNewPassword)
                {
                    return ApiResponseHelper.BadRequest("New passwords do not match.");
                }

                var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
                if (!result.Succeeded)
                {
                    return ApiResponseHelper.InternalServerError("Failed to update password. Please try again.");
                }

                return ApiResponseHelper.Success("Password updated successfully.");
            }
            catch (Exception ex)
            {
                return ApiResponseHelper.InternalServerError("An unexpected error occurred while updating the password.", ex.Message);
            }
        }
    }
}