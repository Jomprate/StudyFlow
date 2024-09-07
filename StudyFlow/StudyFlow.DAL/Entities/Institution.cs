using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudyFlow.DAL.Entities
{
    public interface IInstitution
    {
        int InstitutionID { get; }
        string Name { get; }
        string Address { get; }
        int CountryID { get; }
        string? Website { get; }
        string? Email { get; }
        string? PhoneNumber { get; }
        DateTime EstablishedDate { get; }
        InstitutionType Type { get; }
        string? Description { get; }

        Country Country { get; }
    }

    public class Institution : IInstitution
    {
        [Key]
        public int InstitutionID { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = null!;

        [Required]
        [MaxLength(300)]
        public string Address { get; set; } = null!;

        [Required]
        public int CountryID { get; set; }

        [MaxLength(100)]
        [Url]
        public string? Website { get; set; }

        [MaxLength(100)]
        [EmailAddress]
        public string? Email { get; set; }

        [MaxLength(20)]
        [Phone]
        public string? PhoneNumber { get; set; }

        [Required]
        public DateTime EstablishedDate { get; set; }

        [Required]
        public InstitutionType Type { get; set; }

        [MaxLength(1000)]
        public string? Description { get; set; } // Agregada la propiedad Description

        // Navigation Property
        [ForeignKey("CountryID")]
        public Country Country { get; set; } = null!;

        public ICollection<User> Users { get; set; } = new List<User>();
    }

    public enum InstitutionType
    {
        University,
        College,
        HighSchool,
        VocationalSchool,
        OnlinePlatform,
        Other
    }
}