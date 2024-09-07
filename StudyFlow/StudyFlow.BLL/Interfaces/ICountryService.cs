using Microsoft.AspNetCore.Mvc;
using StudyFlow.DAL.Entities;

namespace StudyFlow.BLL.Interfaces
{
    public interface ICountryService
    {
        Task<IActionResult> GetAsync();

        Task<IActionResult> GetCountryAsync(int id);

        Task<IActionResult> CreateCountryAsync(Country country);

        Task<IActionResult> UpdateCountryAsync(Country country);

        Task<IActionResult> DeleteCountryAsync(int id);

        Task<IActionResult> UpdateCountryIsoCodeAsync(int id, string newIsoCode);

        Task<IActionResult> UpdateCountryNameAsync(int id, string newName);
    }
}