using System.Threading.Tasks;
using SendGrid;
using Matchmaker.Models;

namespace Matchmaker.Services
{
    public interface IEmailSender
    {
        Task<Response> SendActivationEmail(User recipient, ActivationToken token);
        Task<Response> SendActivationEmail(User recipient, EmailChangeToken token, string newEmail);
    }
}
