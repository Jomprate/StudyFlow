using StudyFlow.DAL.Entities;

namespace StudyFlow.BLL.Interfaces
{
    public interface IProfileService
    {
        Task<IEnumerable<Profile>> GetAllProfilesAsync();

        Task<Profile> GetProfileByIdAsync(int id);
    }
}