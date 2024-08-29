using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.BLL.Mapping
{
    internal static class InstitutionMappingExtensions
    {
        public static DAL.Entities.Institution ToEntity(this DTO.InstitutionDTO dto)
        {
            return new DAL.Entities.Institution
            {
                InstitutionID = dto.Id,
                Name = dto.Name,
                Address = dto.Address,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
                Website = dto.Website,
                CountryID = dto.CountryId
            };
        }

        public static DTO.InstitutionDTO ToDTO(this DAL.Entities.Institution entity)
        {
            return new DTO.InstitutionDTO
            {
                Id = entity.InstitutionID,
                Name = entity.Name,
                Address = entity.Address,
                PhoneNumber = entity.PhoneNumber,
                Email = entity.Email,
                Website = entity.Website,
                CountryId = entity.CountryID
            };
        }
    }
}