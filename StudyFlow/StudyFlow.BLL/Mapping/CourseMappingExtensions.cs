using StudyFlow.BLL.DTOS.Entities;

namespace StudyFlow.BLL.Mapping
{
    internal static class CourseMappingExtensions
    {
        internal static DAL.Entities.Course ToEntity(this CourseDTO dto)
        {
            return new DAL.Entities.Course
            {
                Name = dto.Name,
                Description = dto.Description,
                Logo = dto.Logo,
                HaveLogo = !string.IsNullOrEmpty(dto.Logo),
                IsEnabled = dto.IsEnabled ?? false,
                TeacherId = dto.TeacherDTO?.Id ?? Guid.Empty
            };
        }

        internal static CourseDTO ToDTO(this DAL.Entities.Course entity)
        {
            return new CourseDTO
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Logo = entity.Logo,
                IsEnabled = entity.IsEnabled,
                TeacherDTO = new TeacherDTO
                {
                    Id = entity.Teacher.Id,
                    FullName = string.Concat(entity.Teacher.FirstName, " ", entity.Teacher.LastName),
                }
            };
        }
    }
}