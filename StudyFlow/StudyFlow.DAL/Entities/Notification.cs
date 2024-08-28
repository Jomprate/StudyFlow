using System.ComponentModel.DataAnnotations;

namespace StudyFlow.DAL.Entities;

public interface INotification
{
    int Id { get; }
    string Message { get; }
    DateTime DateSent { get; }

    bool IsRead { get; }

    //User user { get; }
}

public class Notification
{
    public int Id { get; set; }

    [MaxLength(500)]
    [Required]
    public string Message { get; set; } = null!;

    [Required(ErrorMessage = "The date of shipment is important")]
    public DateTime DateSent { get; set; }

    public bool IsRead { get; set; }

    //[ForeignKey("UserID")]
    //public User User { get; set; };
}