using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTO;
using StudyFlow.DAL.Entities;

namespace StudyFlow.BLL.Interfaces
{
    public interface IInstitutionService
    {
        Task<IActionResult> GetInstitutionsAsync();

        Task<IActionResult> GetInstitutionsByCountryAsync(Country country);

        Task<IActionResult> GetInstitutionByIdAsync(int id);

        Task<IActionResult> GetInstitutionsByCountryAndNameAsync(Country country, string institutionName);

        Task<IActionResult> CreateInstitutionAsync(InstitutionDTO institution);

        Task<IActionResult> UpdateInstitutionAsync(int id, string institutionName, string institutionAddress, string institutionDescription, string? website, string? email, string? phoneNumber, DateTime establishedDate, InstitutionType type);

        Task<IActionResult> DeleteInstitutionAsync(int id);
    }
}