using StudyFlow.BLL.DTOS;
using StudyFlow.DAL.Entities;

namespace StudyFlow.BLL.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user, IEnumerable<ProfileDTO> profiles);
    }
}