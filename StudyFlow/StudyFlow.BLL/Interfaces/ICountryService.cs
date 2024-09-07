using Microsoft.AspNetCore.Mvc;
using StudyFlow.DAL.Entities;

namespace StudyFlow.BLL.Interfaces
{
    public interface ICountryService
    {
        Task<IEnumerable<Country>> GetAllAsync();

        Task<Country> GetByIdAsync(int id);
    }
}