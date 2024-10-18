using System;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using StudyFlow.Infrastructure.Interfaces;

namespace StudyFlow.Infrastructure.Services
{
    public class MailService : IMailService
    {
        public async Task SendMailAsync(string email, string subject, string message)
        {
            string senderEmail = "Luckyfast436@gmail.com";
            string senderPassword = "pmwz lgmf wtfe wfmx";

            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress(senderEmail);
                mail.To.Add(email);
                mail.Subject = subject;

                // Colocar el cuerpo del mensaje recibido en formato HTML
                mail.Body = message;
                mail.IsBodyHtml = true;  // Asegurar que se interpreta como HTML
                mail.BodyEncoding = Encoding.UTF8;

                using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtpClient.Credentials = new NetworkCredential(senderEmail, senderPassword);
                    smtpClient.EnableSsl = true;

                    try
                    {
                        await smtpClient.SendMailAsync(mail);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error sending email: {ex.Message}");
                        throw;
                    }
                }
            }
        }
    }
}
