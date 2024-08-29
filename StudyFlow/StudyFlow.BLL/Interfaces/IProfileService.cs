using StudyFlow.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.BLL.Interfaces
{
    public interface IProfileService
    {
        Task<IEnumerable<Profile>> GetAllProfilesAsync();

        Task<Profile> GetProfileByIdAsync(int id);
    }
}