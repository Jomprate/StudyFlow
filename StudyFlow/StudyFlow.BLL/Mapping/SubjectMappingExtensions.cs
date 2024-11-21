using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Enumeration;

namespace StudyFlow.BLL.Mapping
{
    internal static class SubjectMappingExtensions
    {
        internal static DAL.Entities.Subject ToEntity(this SubjectDTO dto)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));
            if (dto.Course?.Id == null) throw new ArgumentNullException(nameof(dto.Course), "Course or Course.Id cannot be null.");

            SubjectTypeEnum subjectTypeEnum = Enum.TryParse(dto.Type, out subjectTypeEnum) ? subjectTypeEnum : SubjectTypeEnum.Default;

            return new DAL.Entities.Subject
            {
                Id = dto.Id ?? Guid.NewGuid(), // Generar un nuevo ID si no está presente
                Name = dto.Name ?? string.Empty,
                Link = dto.Link,
                Type = subjectTypeEnum,
                CourseId = (Guid)dto.Course.Id,
                HtmlContent = dto.HtmlContent ?? string.Empty,
                YouTubeVideos = dto.YouTubeVideos.EnsureList(),
                GoogleDriveLinks = dto.GoogleDriveLinks.EnsureList(),
                AlternateLinks = dto.AlternateLinks.EnsureList(),
                ListScheduled = dto.ListScheduleds?.Select(s => new DAL.Entities.Scheduled
                {
                    Id = s.Id ?? Guid.NewGuid(), // Generar un nuevo ID para los horarios si no está presente
                    SubjectId = s.SubjectId ?? Guid.NewGuid(), // Generar un nuevo ID para el SubjectId si no está presente (asegúrate de manejarlo correctamente)
                    ScheduledDate = s.ScheduledDate ?? throw new ArgumentNullException(nameof(s.ScheduledDate), "ScheduledDate cannot be null."),
                    Link = s.Link ?? string.Empty
                }).ToList() ?? new List<DAL.Entities.Scheduled>()
            };
        }

        internal static SubjectDTO ToDTO(this DAL.Entities.Subject entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            return new SubjectDTO
            {
                Id = entity.Id,
                Name = entity.Name ?? string.Empty,
                Link = entity.Link,
                Type = entity.Type.ToString(),
                HtmlContent = entity.HtmlContent ?? string.Empty,
                YouTubeVideos = entity.YouTubeVideos.EnsureList(),
                GoogleDriveLinks = entity.GoogleDriveLinks.EnsureList(),
                AlternateLinks = entity.AlternateLinks.EnsureList(),
                Course = entity.Course != null ? new CourseDTO
                {
                    Id = entity.Course.Id,
                    Name = entity.Course.Name ?? string.Empty,
                    Description = entity.Course.Description ?? string.Empty,
                    IsEnabled = entity.Course.IsEnabled,
                    TeacherDTO = entity.Course.Teacher != null ? new TeacherDTO
                    {
                        Id = entity.Course.Teacher.Id,
                        FullName = string.Concat(entity.Course.Teacher.FirstName ?? string.Empty, " ", entity.Course.Teacher.LastName ?? string.Empty),
                    } : null
                } : null,
                ListScheduleds = entity.ListScheduled?.Select(s => new ScheduledDTO
                {
                    Id = s.Id,
                    SubjectId = s.SubjectId,
                    ScheduledDate = s.ScheduledDate,
                    Link = s.Link ?? string.Empty
                }).ToList() ?? new List<ScheduledDTO>()
            };
        }

        private static List<T> EnsureList<T>(this List<T>? list) => list ?? new List<T>();
    }
}