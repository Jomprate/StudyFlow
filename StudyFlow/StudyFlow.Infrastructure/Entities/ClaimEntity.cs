using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.Infrastructure.Entities
{
    public class ClaimEntity
    {
        public Guid Id { get; set; }
        public string Rol { get; set; } = string.Empty;
        public string ExpirationDuration { get; set; } = null!;
    }
}