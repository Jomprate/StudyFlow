using StudyFlow.DAL.Entities;

namespace StudyFlow.BLL.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user, Profile profile);
    }
}