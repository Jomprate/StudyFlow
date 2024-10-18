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
                // Verificar si el país existe
                var countryExists = await _unitOfWork.CountryRepository.AnyAsync(w => w.Id == user.CountryId);
                if (!countryExists)
                {
                    return ApiResponseHelper.NotFound($"Not found country with the Id {user.CountryId}.");
                }

                // Verificar si el email ya está registrado
                var emailExists = await _unitOfWork.UserRepository.AnyAsync(w => w.Email == user.Email);
                if (emailExists)
                {
                    return new BadRequestObjectResult("User with this email already exists.");
                }

                // Crear el usuario
                User userToCreate = user.ToEntity();
                userToCreate.IsEnabled = false;
                userToCreate.HaveProfilePicture = !string.IsNullOrEmpty(user.ProfilePicture);
                User newUser = await _unitOfWork.UserRepository.RegisterAsync(userToCreate, user.Password);

                // Si el usuario no fue creado, devolver error
                if (newUser == null)
                {
                    return new BadRequestObjectResult("Failed to create user.");
                }

                // Guardar cambios en la base de datos
                var result = await _unitOfWork.SaveChangesAsync();

                // No lanzar error inmediatamente si SaveChangesAsync devuelve 0
                if (result <= 0)
                {
                    // Verificar si el usuario realmente se creó antes de lanzar el error
                    var checkUser = await _unitOfWork.UserRepository.GetByIdAsync(newUser.Id);
                    if (checkUser == null)
                    {
                        return new BadRequestObjectResult("Failed to save user after creation.");
                    }
                }

                // Añadir una pausa antes de verificar si el usuario fue creado
                await Task.Delay(2000); // Esperar 2 segundos (ajusta el tiempo si lo prefieres)

                // Verificar si el usuario fue creado utilizando GetUserByIdAsync
                var checkUserResult = await GetUserByIdAsync(newUser.Id);
                if (checkUserResult is NotFoundObjectResult)
                {
                    return new BadRequestObjectResult("Failed to verify user creation.");
                }

                // Subir imagen de perfil, si aplica
                if (!string.IsNullOrEmpty(user.ProfilePicture))
                {
                    bool uploaded = await _storageService.UploadAsync(user.ProfilePicture, newUser.Id.ToString());
                    if (!uploaded)
                    {
                        return new BadRequestObjectResult(new { Message = "Failed to upload profile picture.", UserId = newUser.Id });
                    }
                }

                // Generar el token de confirmación de email
                string token = await _unitOfWork.UserRepository.GenerateEmailConfirmationTokenAsync(newUser);

                // Crear el enlace de confirmación
                string confirmationLink = $"https://yourdomain.com/confirm-email?userId={newUser.Id}&token={token}";

                // Crear el cuerpo del correo en formato HTML

                try
                {
                    // Formatear el cuerpo del correo utilizando los valores correctos para confirmationLink y token
                    string emailBody = string.Format(Message_Constants.EmailBodyConfirmation, confirmationLink, token);

                    // Enviar el correo usando el servicio de correo
                    await _mailService.SendMailAsync(user.Email, "Welcome to StudyFlow", emailBody);
                }
                catch (Exception ex)
                {
                    // Manejar el error y mostrar el mensaje de error en los logs
                    Console.WriteLine($"Error sending email: {ex.Message}");
                }

                // Devolver respuesta de éxito con el ID del usuario
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