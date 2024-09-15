using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.DAL.Entities
{
    public class Enrollment : EntityAuditBase
    {
        public Guid CourseId { get; set; }
        public Guid StudentId { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsCompleted { get; set; }
        public User Student { get; set; } = null!;
        public Course Course { get; set; } = null!;
    }
}