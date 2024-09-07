using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IRepository<Profile> _repository;

        public ProfileService(IRepository<Profile> repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<Profile>> GetAllProfilesAsync()
        {
            return _repository.GetAllAsync();
        }

        public async Task<Profile> GetProfileByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }
    }
}