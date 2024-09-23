using StudyFlow.BLL.DTOS.Entities;

namespace StudyFlow.BLL.DTOS.Parameters.Response
{
    public class ParametersDTOResponse
    {
        public IEnumerable<ProfileDTO> ListProfile { get; set; } = new List<ProfileDTO>();
        public IEnumerable<CountryDTO> ListCountry { get; set; } = new List<CountryDTO>();
    }
}