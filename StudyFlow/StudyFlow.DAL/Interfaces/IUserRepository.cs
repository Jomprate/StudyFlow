using StudyFlow.DAL.Entities;

namespace StudyFlow.DAL.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetUserWithProfileAsync(string email);
    }
}