using StudyFlow.BLL.DTOS;
using StudyFlow.BLL.DTOS.Entities;

namespace StudyFlow.BLL.Mapping
{
    internal static class UsuarioMappingExtensions
    {
        internal static DAL.Entities.User ToEntity(this DTOS.User.AddUserDTO dto)
        {
            return new DAL.Entities.User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PasswordHash = dto.Password,
                PhoneNumber = dto.PhoneNumber,
                CountryId = dto.CountryId,
                IsEnabled = dto.IsEnabled,
            };
        }

        internal static DTOS.User.AddUserDTO ToAddDTO(this DAL.Entities.User entity)
        {
            return new DTOS.User.AddUserDTO
            {
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                Password = entity.PasswordHash,
                PhoneNumber = entity.PhoneNumber,
            };
        }

        internal static DTOS.User.GetUserDTO ToGetDTO(this DAL.Entities.User entity)
        {
            return new DTOS.User.GetUserDTO
            {
                Id = entity.Id,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                PhoneNumber = entity.PhoneNumber,
                Country = entity.Country,
                IsEnabled = entity.IsEnabled,
                IsOnline = entity.IsOnline,
            };
        }
    }
}