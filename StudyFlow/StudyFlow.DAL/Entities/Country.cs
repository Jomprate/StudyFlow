using System.ComponentModel.DataAnnotations;

namespace StudyFlow.DAL.Entities;

public class Country
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string IsoCode { get; set; } = null!;
}