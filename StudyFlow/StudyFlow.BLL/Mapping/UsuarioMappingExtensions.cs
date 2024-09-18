using StudyFlow.BLL.DTOS;
using StudyFlow.BLL.DTOS.Entities;

namespace StudyFlow.BLL.Mapping
{
    internal static class UsuarioMappingExtensions
    {
        public static DAL.Entities.User ToEntity(this DTOS.User.AddUserDTO dto)
        {
            return new DAL.Entities.User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Password = dto.Password,
                PhoneNumber = dto.PhoneNumber,
                CountryId = dto.CountryId,
                IsEnabled = dto.IsEnabled,
            };
        }

        public static DTOS.User.AddUserDTO ToAddDTO(this DAL.Entities.User entity)
        {
            return new DTOS.User.AddUserDTO
            {
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                Password = entity.Password,
                PhoneNumber = entity.PhoneNumber,
                listProfileId = entity.ListProfile.Select(p => p.Id).ToList()
            };
        }

        public static DTOS.User.GetUserDTO ToGetDTO(this DAL.Entities.User entity)
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
                listProfile = entity.ListProfile.Select(p => new ProfileDTO() { Id = p.Id, Name = p.Name, Description = p.Description, }).ToList()
            };
        }

        public static IEnumerable<DTOS.User.GetUserDTO> ToGetDTO(this IEnumerable<DAL.Entities.User> entities)
        {
            return entities.Select(e => e.ToGetDTO());
        }
    }
}