using System;
using System.Collections.Generic;
using System.Linq;
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
                using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587))
                {
                    mail.From = new MailAddress(senderEmail);
                    mail.To.Add(email);
                    mail.Subject = subject;
                    mail.Body = message;

                    smtpClient.Credentials = new NetworkCredential(senderEmail, senderPassword);
                    smtpClient.EnableSsl = true;

                    try
                    {
                        smtpClient.Send(mail);
                    }
                    catch
                    {
                        throw;
                    }
                }
            }
        }
    }
}