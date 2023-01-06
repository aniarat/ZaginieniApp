using FluentValidation;
using zaginieni_webapp.Entities;

namespace zaginieni_webapp.Models.Validators
{
    //nałożenie warunków walidacji
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator(ApplicationDbContext dbContext)
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(8);

            RuleFor(x => x.ConfirmPassword).Equal(e => e.Password);

            RuleFor(x => x.PhoneNumber)
               .NotEmpty()
               .Equals(9);

            RuleFor(x => x.FirstName)
                .NotEmpty();

            RuleFor(x => x.LastName)
                .NotEmpty();


            //sprawdzanie, czy użytkownik o takim emailu istnieje w bd
            RuleFor(x => x.Email)
                .Custom((value, context) =>
                {
                    var emailInUse = dbContext.Users.Any(u => u.Email == value);
                    if (emailInUse)
                    {
                        context.AddFailure("Email", "E-mail zajęty.");
                    }
                });
               


        }
    }
}
