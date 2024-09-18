using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProfileService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Task<IEnumerable<Profile>> GetAllProfilesAsync()
        {
            return _unitOfWork.ProfileRepository.GetAllAsync();
        }

        public async Task<Profile> GetProfileByIdAsync(int id)
        {
            return await _unitOfWork.ProfileRepository.GetByIdAsync(id);
        }
    }
}