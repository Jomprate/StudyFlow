namespace StudyFlow.Infrastructure.Interfaces
{
    public interface IMailService
    {
        Task SendMailAsync(string email, string subject, string message);
    }
}