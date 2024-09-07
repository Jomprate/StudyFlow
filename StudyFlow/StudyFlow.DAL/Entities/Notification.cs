using System.ComponentModel.DataAnnotations;

namespace StudyFlow.DAL.Entities;

public interface INotification
{
    int Id { get; }
    string Message { get; }
    DateTime DateCreated { get; }
    DateTime DateUpdated { get; }
    DateTime DateSent { get; }
    //User user { get; }
}

public class Notification
{
    public int Id { get; set; }

    [MaxLength(500)]
    [Required]
    public string Message { get; set; } = null!;

    [Required(ErrorMessage = "The date created is important")]
    public DateTime DateCreated { get; set; }

    [Required(ErrorMessage = "The date update is important")]
    public DateTime DateUpdated { get; set; }

    [Required(ErrorMessage = "The date send is important")]
    public DateTime DateSent { get; set; }

    //[ForeignKey("UserID")]
    //public User User { get; set; };
}