using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.Insfractructure.Entities
{
    public class ClaimEntity
    {
        public Guid Id { get; set; }
        public IEnumerable<string> Roles { get; set; } = Enumerable.Empty<string>();
        public string ExpirationDuration { get; set; } = null!;
    }
}