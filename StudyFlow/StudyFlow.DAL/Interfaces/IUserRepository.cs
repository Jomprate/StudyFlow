using StudyFlow.DAL.Entities;

namespace StudyFlow.DAL.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetUserByIdWithProfileAsync(Guid id);

        Task<User> GetUserByEmailWithProfileAsync(string email);

        Task<IEnumerable<User>> GetUsersWithProfileAsync();
    }
}