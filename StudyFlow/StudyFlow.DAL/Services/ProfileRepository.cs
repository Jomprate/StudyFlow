using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.DAL.Services
{
    public class ProfileRepository : Repository<Profile>, IProfileRepository
    {
        public ProfileRepository(DataContext dataContext) : base(dataContext)
        {
        }
    }
}