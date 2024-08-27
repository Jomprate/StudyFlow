using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public async Task<IActionResult> UpdateInstitutionAsync(int id, string institutionName, string institutionAddress, string institutionDescription, string? website, string? email, string? phoneNumber, DateTime establishedDate, InstitutionType type)
        {
            var institution = await _repository.GetAsync(id);
            if (institution == null)
            {
                return new NotFoundObjectResult(new { Error = $"Not found institution with the Id {id}." });
            }

            // Actualizar los datos de la institución
            institution.Name = institutionName;
            institution.Address = institutionAddress;
            institution.Description = institutionDescription;
            institution.Website = website;
            institution.Email = email;
            institution.PhoneNumber = phoneNumber;
            institution.EstablishedDate = establishedDate;
            institution.Type = type;

            var result = await _repository.UpdateAsync(institution);

            return new OkObjectResult(result);
        }
    }
}