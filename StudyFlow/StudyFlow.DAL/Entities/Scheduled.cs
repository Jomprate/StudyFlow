using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.DAL.Entities
{
    public class Scheduled : EntityAuditBase
    {
        public Guid Id { get; set; }
        public Guid SubjectId { get; set; }
        public DateTime ScheduledDate { get; set; }
        public string? Link { get; set; }
        public Subject Subject { get; set; } = null!;
    }
}