using StudyFlow.BLL.DTOS;

namespace StudyFlow.BLL.Mapping
{
    internal static class UsuarioMappingExtensions
    {
        public static DAL.Entities.User ToEntity(this DTOS.AddUserDTO dto)
        {
            return new DAL.Entities.User
            {
                Id = dto.Id,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Password = dto.Password,
                PhoneNumber = dto.PhoneNumber,
                ProfilePicture = dto.ProfilePicture,
                CountryId = dto.CountryId,
                IsEnabled = dto.IsEnabled,
            };
        }

        public static DTOS.AddUserDTO ToAddDTO(this DAL.Entities.User entity)
        {
            return new DTOS.AddUserDTO
            {
                Id = entity.Id,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                Password = entity.Password,
                PhoneNumber = entity.PhoneNumber,
                ProfilePicture = entity.ProfilePicture,
                listProfileId = entity.ListProfile.Select(p => p.Id).ToList()
            };
        }

        public static DTOS.GetUserDTO ToGetDTO(this DAL.Entities.User entity)
        {
            return new DTOS.GetUserDTO
            {
                Id = entity.Id,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                PhoneNumber = entity.PhoneNumber,
                Country = entity.Country,
                ProfilePicture = entity.ProfilePicture,
                IsEnabled = entity.IsEnabled,
                IsOnline = entity.IsOnline,
                listProfile = entity.ListProfile.Select(p => new ProfileDTO() { Id = p.Id, Name = p.Name, Description = p.Description, }).ToList()
            };
        }

        public static IEnumerable<DTOS.GetUserDTO> ToGetDTO(this IEnumerable<DAL.Entities.User> entities)
        {
            return entities.Select(e => e.ToGetDTO());
        }
    }
}