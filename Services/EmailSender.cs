using System;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using Matchmaker.Models;

namespace Matchmaker.Services
{
    public class EmailSender : IEmailSender
    {
        public async Task<Response> SendEmail(User recipient, ActivationToken token)
        {
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("noreply@sportmatchmaker.azurewebsites.net", "Sport Matchmaker");
            var subject = "Please activate your Sport Matchmaker account";
            var to = new EmailAddress(recipient.Email, recipient.Name);
            var plainTextContent = $"Sveiki {recipient.Name}," +
                " norėdami užbaigti savo registraciją paspauskite nuorodą." +
                " Jeigu tai ne jūs arba nesiregistravote mūsų svetainėje ignoruokite šį laišką.";
            var htmlContent = $"<h2>Sveiki {recipient.Name},</h2><br>" +
                "<div>norėdami užbaigti savo registraciją " +
                $"<a href=\"https://sportmatchmaker.azurewebsites.com/api/auth/activate/{token.Id}\"> paspauskite čia</a> <br>" +
                "Jeigu tai ne jūs arba nesiregistravote šioje mūsų svetainėje ignoruokite šį laišką.</div>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return response;
        }
    }
}
