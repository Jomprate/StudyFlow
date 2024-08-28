using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.DAL.Entities
{
    public class Profile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Descripcion { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}