using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class InstitutionService : IInstitutionService
    {
        private readonly IRepository<Institution> _repository;

        public InstitutionService(IRepository<Institution> repository)
        {
            _repository = repository;
        }

        public async Task<IActionResult> CreateInstitutionAsync(Institution institution)
        {
            if (institution == null)
            {
                return new BadRequestObjectResult("Institution data is required.");
            }

            // Validar los datos requeridos
            if (string.IsNullOrEmpty(institution.Name) || string.IsNullOrEmpty(institution.Address) || institution.CountryID == 0)
            {
                return new BadRequestObjectResult("Required fields are missing: Name, Address, CountryID.");
            }

            var result = await _repository.CreateAsync(institution);

            return new CreatedResult("", result);
        }

        public async Task<IActionResult> DeleteInstitutionAsync(int id)
        {
            if (id <= 0)
            {
                return new BadRequestObjectResult(new { Error = "The Id cannot be 0 or null." });
            }

            var institution = await _repository.GetAsync(id);

            if (institution == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found institution with the Id {id}." });
            }

            int result = await _repository.DeleteAsync(institution);

            if (result > 0)
            {
                return new OkObjectResult(new { Message = "Institution deleted successfully" });
            }
            else
            {
                return new BadRequestObjectResult(new { Message = "Failed to delete institution" });
            }
        }

        public async Task<IActionResult> GetInstitutionsAsync()
        {
            var institutions = await _repository.GetAllAsync();
            if (!institutions.Any())
            {
                return new NotFoundObjectResult("No institutions found.");
            }
            return new OkObjectResult(institutions);
        }

        public async Task<IActionResult> GetInstitutionByIdAsync(int id)
        {
            var institution = await _repository.GetAsync(id);
            if (institution == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found institution with the Id {id}." });
            }
            return new OkObjectResult(institution);
        }

        public async Task<IActionResult> GetInstitutionsByCountryAndNameAsync(Country country, string institutionName)
        {
            var institutions = await _repository.FindAsync(i => i.CountryID == country.Id && i.Name.Contains(institutionName));
            if (!institutions.Any())
            {
                return new NotFoundObjectResult($"No institutions found with the name '{institutionName}' in the specified country.");
            }
            return new OkObjectResult(institutions);
        }

        public async Task<IActionResult> GetInstitutionsByCountryAsync(Country country)
        {
            var institutions = await _repository.FindAsync(i => i.CountryID == country.Id);
            if (!institutions.Any())
            {
                return new NotFoundObjectResult("No institutions found in the specified country.");
            }
            return new OkObjectResult(institutions);
        }

        public async Task<IActionResult> UpdateInstitutionAsync(Institution institution)
        {
            if (institution == null || institution.InstitutionID <= 0)
            {
                return new BadRequestObjectResult(new { Error = "The Id cannot be 0 or null." });
            }

            var currentInstitution = await _repository.GetAsync(institution.InstitutionID);

            if (currentInstitution == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found institution with the Id {institution.InstitutionID}." });
            }

            currentInstitution.Name = institution.Name;
            currentInstitution.Address = institution.Address;
            currentInstitution.Description = institution.Description;
            currentInstitution.Website = institution.Website;
            currentInstitution.Email = institution.Email;
            currentInstitution.PhoneNumber = institution.PhoneNumber;
            currentInstitution.EstablishedDate = institution.EstablishedDate;
            currentInstitution.Type = institution.Type;

            int result = await _repository.UpdateAsync(currentInstitution);

            if (result > 0)
            {
                return new OkObjectResult(new { Message = "Institution updated successfully" });
            }
            else
            {
                return new BadRequestObjectResult(new { Message = "Failed to update institution" });
            }
        }
    }
}