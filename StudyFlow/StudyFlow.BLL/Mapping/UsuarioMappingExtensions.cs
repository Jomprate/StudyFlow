namespace StudyFlow.BLL.Mapping
{
    internal static class UsuarioMappingExtensions
    {
        public static DAL.Entities.User ToEntity(this DTO.UserDTO dto)
        {
            return new DAL.Entities.User
            {
                Id = dto.Id,
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
                PhoneNumber = dto.PhoneNumber,
                BirthDate = dto.BirthDate,
                Address = dto.Address,
                ProfilePicture = dto.ProfilePicture,
                InstitutionID = dto.InstitutionID,
                ProfileId = dto.ProfileId
            };
        }

        public static DTO.UserDTO ToDTO(this DAL.Entities.User entity)
        {
            return new DTO.UserDTO
            {
                Id = entity.Id,
                Name = entity.Name,
                Email = entity.Email,
                Password = entity.Password,
                PhoneNumber = entity.PhoneNumber,
                BirthDate = entity.BirthDate,
                Address = entity.Address,
                ProfilePicture = entity.ProfilePicture,
                InstitutionID = entity.InstitutionID,
                ProfileId = entity.ProfileId
            };
        }
    }
}