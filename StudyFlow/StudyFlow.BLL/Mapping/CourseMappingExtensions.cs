using StudyFlow.BLL.DTOS.Entities;

namespace StudyFlow.BLL.Mapping
{
    public static class CourseMappingExtensions
    {
        public static StudyFlow.DAL.Entities.Course ToEntity(this StudyFlow.BLL.DTOS.Entities.CourseDTO dto)
        {
            return new StudyFlow.DAL.Entities.Course
            {
                Name = dto.Name,
                Description = dto.Description,
                HaveLogo = string.IsNullOrEmpty(dto.Logo),
                IsEnabled = dto.IsEnabled ?? false,
                TeacherId = dto.TeacherDTO.Id ?? Guid.Empty
            };
        }

        public static StudyFlow.BLL.DTOS.Entities.CourseDTO ToDTO(this StudyFlow.DAL.Entities.Course entity)
        {
            return new StudyFlow.BLL.DTOS.Entities.CourseDTO
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
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