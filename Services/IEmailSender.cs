using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using Matchmaker.Models;

namespace Matchmaker.Services
{
    public interface IEmailSender
    {
        Task<Response> SendEmail(User recipient, ActivationToken token);
    }
}
