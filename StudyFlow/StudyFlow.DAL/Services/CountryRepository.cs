using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.DAL.Services
{
    public class CountryRepository : Repository<Country>, ICountryRepository
    {
        public CountryRepository(DataContext dataContext) : base(dataContext)
        {
        }
    }
}