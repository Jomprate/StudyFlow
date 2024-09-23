using StudyFlow.BLL.DTOS.Entities;

namespace StudyFlow.BLL.Mapping
{
    internal static class EnrollmentMappingExtensions
    {
        internal static DAL.Entities.Enrollment ToEntity(this EnrollmentDTO dto)
        {
            return new DAL.Entities.Enrollment
            {
                StudentId = dto.StudentDTO.Id.Value,
                CourseId = dto.CourseDTO.Id.Value,
                CreatedAt = dto.CreatedDateTime.Value,
                UpdatedAt = dto.UpdatedDateTime.Value,
            };
        }

        internal static EnrollmentDTO ToDTO(this DAL.Entities.Enrollment entity)
        {
            return new EnrollmentDTO
            {
                StudentDTO = entity.Student.ToGetDTO(),
                CourseDTO = entity.Course.ToDTO(),
                IsEnabled = entity.IsEnabled,
                IsCompleted = entity.IsCompleted,
                CreatedDateTime = entity.CreatedAt,
                UpdatedDateTime = entity.UpdatedAt,
            };
        }
    }
}