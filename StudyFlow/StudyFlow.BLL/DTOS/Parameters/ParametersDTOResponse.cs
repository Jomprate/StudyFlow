using StudyFlow.BLL.DTOS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.BLL.DTOS.Parameters
{
    public class ParametersDTOResponse
    {
        public IEnumerable<ProfileDTO> ListProfile { get; set; } = new List<ProfileDTO>();
        public IEnumerable<CountryDTO> ListCountry { get; set; } = new List<CountryDTO>();
    }
}