using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Entities;

namespace StudyFlow.BLL.Mapping
{
    internal static class ScheduledMappingExtensions
    {
        internal static Scheduled ToEntity(ScheduledDTO scheduled)
        {
            return new Scheduled
            {
                ScheduledDate = scheduled.ScheduledDate ?? DateTime.Now,
                SubjectId = scheduled.SubjectId ?? Guid.Empty,
                Link = scheduled.Link ?? string.Empty
            };
        }

        internal static ScheduledDTO ToDTO(Scheduled scheduled)
        {
            return new ScheduledDTO
            {
                Id = scheduled.Id,
                SubjectId = scheduled.SubjectId,
                ScheduledDate = scheduled.ScheduledDate,
                Link = scheduled.Link
            };
        }
    }
}