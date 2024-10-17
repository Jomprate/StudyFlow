using StudyFlow.BLL.DTOS;
using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Enumeration;

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
                UserName = dto.Email,
                PasswordHash = dto.Password,
                PhoneNumber = dto.PhoneNumber,
                CountryId = dto.CountryId,
                UserType = (UserTypeEnum)Enum.Parse(typeof(UserTypeEnum), dto.ProfileId.ToString()),
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
                CountryId = entity.CountryId,
                ProfileId = (int)entity.UserType,
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
                Profile = new ProfileDTO
                {
                    Id = (int)entity.UserType,
                    Name = entity.UserType.ToString(),
                },
            };
        }

        internal static DAL.Entities.User ToEntity(this DTOS.User.UpdateUserDTO dto)
        {
            return new DAL.Entities.User
            {
                Id = dto.Id,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                PhoneNumber = dto.PhoneNumber,
                CountryId = dto.CountryId,
                IsEnabled = dto.IsEnabled,
                UserType = (UserTypeEnum)Enum.Parse(typeof(UserTypeEnum), dto.ProfileId.ToString()),
                HaveProfilePicture = !string.IsNullOrWhiteSpace(dto.ProfilePicture),
            };
        }
    }
}