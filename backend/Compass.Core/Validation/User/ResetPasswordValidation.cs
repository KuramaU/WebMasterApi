using Compass.Core.DTO_s;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Validation.User
{
    public class ResetPasswordValidation : AbstractValidator<ResetPasswordDto>
    {
        public ResetPasswordValidation()
        {
            //RuleFor(r => r.Email).NotEmpty().EmailAddress();
            RuleFor(r => r.CurrentPassword).NotEmpty().MinimumLength(6);
            RuleFor(r => r.NewPassword).NotEmpty().MinimumLength(6);
            RuleFor(r => r.ConfirmNewPassword).NotEmpty().MinimumLength(6);
            RuleFor(r => r.ConfirmNewPassword).Equal(x => x.NewPassword);
            RuleFor(r => r.NewPassword).NotEqual(x => x.CurrentPassword);
        }
    }
}
