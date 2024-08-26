using System.ComponentModel.DataAnnotations;

namespace StudyFlow.DAL.Entities;

public interface ICountry
{
    int Id { get; }
    string Name { get; }
    string IsoCode { get; }
}

public class Country
{
    public int Id { get; set; }

    [MaxLength(100)]
    [Required]
    public string Name { get; set; } = null!;

    [MaxLength(3)]
    [Required(ErrorMessage = "El código ISO del país es obligatorio.")]
    public string IsoCode { get; set; } = null!;
}