using System;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using Matchmaker.Models;

namespace Matchmaker.Services
{
    public class EmailSender : IEmailSender
    {
        public async Task<Response> SendActivationEmail(User recipient, ActivationToken token)
        {
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("noreply@sportmatchmaker.azurewebsites.net", "Sport Matchmaker");
            var subject = "Aktyvuokite savo Sport Matchmaker paskyrą";
            var to = new EmailAddress(recipient.Email);
            var plainTextContent = $"Sveiki {recipient.Name}," +
                " norėdami užbaigti savo registraciją paspauskite nuorodą." +
                " Jeigu tai ne jūs arba nesiregistravote mūsų svetainėje ignoruokite šį laišką.";
            var htmlContent = $"<html><body><h2 style=\"font-size: 36\">Sveiki {recipient.Name},</h2><br>" +
                "<div style=\"font-size: 20;\">norėdami užbaigti savo registraciją " +
                $"<a style=\"color: blue\" href=\"https://sportmatchmaker.azurewebsites.net/api/auth/activate/{token.Id}\">paspauskite čia</a> <br>" +
                "Jeigu tai ne jūs arba nesiregistravote šioje mūsų svetainėje ignoruokite šį laišką.</div></body></html>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return response;
        }
        public async Task<Response> SendActivationEmail(User recipient, EmailChangeToken token) {
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("noreply@sportmatchmaker.azurewebsites.net", "Sport Matchmaker");
            var subject = "Patvirtinkite savo elektroninio pašto keitimą!";
            var to = new EmailAddress(recipient.Email);
            var plainTextContent = $"Sveiki {recipient.Name}," +
                " Norėdami patvirtinti savo elektroninio pašto keitimą paspauskite nuorodą." +
                " Jeigu tai ne jūs arba nekeitėte savo elektroninio pašto ignoruokite šį laišką.";
            var htmlContent = $"<html><body><h2 style=\"font-size: 36\">Sveiki, {recipient.Name},</h2><br>" +
                "<div style=\"font-size: 20;\"> norėdami patvirtinti savo elektroninio pašto keitimą " +
                $"<a style=\"color: blue\" href=\"https://sportmatchmaker.azurewebsites.net/api/auth/activateNewEmail/{token.Id}\">paspauskite čia</a> <br>" +
                "Jeigu tai ne jūs arba nekeitėte savo elektroninio pašto ignoruokite šį laišką.</div></body></html>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return response;
        }
    }
}
