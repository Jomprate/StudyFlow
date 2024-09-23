using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Enumeration;

namespace StudyFlow.BLL.Mapping
{
    internal static class SubjectMappingExtensions
    {
        internal static DAL.Entities.Subject ToEntity(this SubjectDTO dto)
        {
            SubjectTypeEnum subjectTypeEnum = Enum.TryParse(dto.Type, out subjectTypeEnum) ? subjectTypeEnum : SubjectTypeEnum.Default;
            return new DAL.Entities.Subject
            {
                Name = dto.Name,
                Link = dto.Link,
                Type = subjectTypeEnum,
                CourseId = dto.Course.Id.Value,
            };
        }

        internal static SubjectDTO ToDTO(this DAL.Entities.Subject entity)
        {
            return new SubjectDTO
            {
                Id = entity.Id,
                Name = entity.Name,
                Link = entity.Link,
                Type = entity.Type.ToString(),
                Course = new CourseDTO
                {
                    Id = entity.Course.Id,
                    Name = entity.Course.Name,
                    Description = entity.Course.Description,
                    IsEnabled = entity.Course.IsEnabled,
                    TeacherDTO = new TeacherDTO
                    {
                        Id = entity.Course.Teacher.Id,
                        FullName = string.Concat(entity.Course.Teacher.FirstName, " ", entity.Course.Teacher.LastName),
                    }
                }
            };
        }
    }
}