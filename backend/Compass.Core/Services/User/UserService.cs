using AutoMapper;
using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Services.User
{
    public class UserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly JwtService _jwtService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;


        public UserService(JwtService jwtService, UserManager<AppUser> userManager, IMapper mapper, SignInManager<AppUser> signInManager, IConfiguration configuration, EmailService emailService)
        {
            _userManager = userManager;
            _mapper = mapper;
            _signInManager = signInManager;
            _jwtService = jwtService;
            _configuration = configuration;
            _emailService = emailService;
        }
        public async Task<ServiceResponse> InsertAsync(ResiterUserDto model)
        {
            if (_userManager.FindByEmailAsync(model.Email) != null)
            {
                var mappedUser = _mapper.Map<AppUser>(model);
                var result = await _userManager.CreateAsync(mappedUser, model.Password);
                await SendConfirmationEmailAsync(mappedUser);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(mappedUser, model.Role);

                    return new ServiceResponse
                    {
                        Success = true,
                        Message = "User was successfully created"
                    };
                }
                else
                {

                    return new ServiceResponse
                    {
                        Success = false,
                        Message = result.Errors.Select(e => e.Description).FirstOrDefault()
                    };
                }
            }
            else
            {

                return new ServiceResponse
                {
                    Success = false,
                    Message = "This email is already taken"
                };
            }

        }
        public async Task<ServiceResponse> LoginAsync(LoginUserDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Login or password incorrect."
                };
            }

            var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: true);
            if (signInResult.Succeeded)
            {
                var tokens = await _jwtService.GenerateJwtTokenAsync(user);

                return new ServiceResponse
                {
                    AccessToken = tokens.token,
                    RefreshToken = tokens.refreshToken.Token,
                    Success = true,
                    Message = "User was logged in successfully"
                };
            }
            else if (signInResult.IsNotAllowed)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Confirm your email please"
                };
            }
            else if (signInResult.IsLockedOut)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User is blocked"
                };
            }
            else
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Login or password is incorrect"
                };
            }
        }
        public async Task<ServiceResponse> GetAllAsync()
        {
            var mappedUsers = _userManager.Users.Select(u => _mapper.Map<AppUser, AllUsersDto>(u)).ToList();

            for (int i = 0; i < _userManager.Users.Count(); i++)
            {
                mappedUsers[i].Role = (await _userManager.GetRolesAsync(_userManager.Users.ToList()[i])).FirstOrDefault();
                mappedUsers[i].IsBlocked = await _userManager.IsLockedOutAsync(_userManager.Users.ToList()[i]);
            }
            return new ServiceResponse
            {
                Success = true,
                Message = "All users were loaded",
                Payload = mappedUsers
            };
        }
        public async Task<ServiceResponse> RefreshTokenAsync(TokenRequestDto model)
        {
            return await _jwtService.VerifyTokenAsync(model);
        }

        public async Task<ServiceResponse> LogOutAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User was not found"
                };
            }

            IEnumerable<RefreshToken> tokens = await _jwtService.GetAll();
            foreach (RefreshToken token in tokens)
            {
                await _jwtService.Delete(token);
            }
            return new ServiceResponse
            {
                Success = true,
                Message = "User was succesfully logged out"
            };
        }
        public async Task<ServiceResponse> UpdateProfileAsync(UpdateProfileDto model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User was not found"
                };
            }

            user.Name = model.Name;
            user.Surname = model.Surname;
            user.PhoneNumber = model.PhoneNumber;

            if (user.Email != model.Email)
            {
                user.Email = model.Email;
                user.UserName = model.Email;
                user.EmailConfirmed = false;
                await SendConfirmationEmailAsync(user);
            }
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return new ServiceResponse
                {
                    Success = true,
                    Message = "The user was successfully updated"
                };
            }
            List<IdentityError> errorList = result.Errors.ToList();
            string errors = "";
            foreach (var error in errorList)
            {
                errors = errors + error.Description.ToString();
            }
            return new ServiceResponse
            {
                Success = false,
                Message = errors
            };
        }
        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var result = await _userManager.FindByIdAsync(id);
            if (result == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Nothing was found",
                };
            }

            await _userManager.DeleteAsync(result);
            return new ServiceResponse
            {
                Success = true,
                Message = "The user was deleted",
                Payload = result
            };
        }

        public async Task<ServiceResponse> ResetPasswordAsync(ResetPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User was found",
                };
            }
            if (await _userManager.CheckPasswordAsync(user, model.CurrentPassword) == false)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "The password entered is incorrect",
                };
            }

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            if (result.Succeeded)
            {
                return new ServiceResponse
                {
                    Success = true,
                    Message = "The password was successfully changed",
                };
            }

            return new ServiceResponse
            {
                Success = false,
                Message = "Something went wrong!",
            };
        }

        public async Task<ServiceResponse> SendResetEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                await SendResetPasswordEmailAsync(user);
            }
            else
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Incorrect email",
                };
            }
            return new ServiceResponse
            {
                Success = true,
                Message = "Check your inbox please",
            };
        }
        
        public async Task<ServiceResponse> GetById(string userId)
        {
            var result = await _userManager.FindByIdAsync(userId);
            if (result != null)
            {
                return new ServiceResponse
                {
                    Success = true,
                    Message = "User was found",
                    Payload = result
                };
            }
            return new ServiceResponse
            {
                Success = false,
                Message = "User was not found",
            };
        }

        public async Task<ServiceResponse> ConfirmEmailAsync(ConfirmEmailDto model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User was not found"
                };
            }

            var token = WebEncoders.Base64UrlDecode(model.Token);
            var result = await _userManager.ConfirmEmailAsync(user, Encoding.UTF8.GetString(token));

            if (result.Succeeded)
            {
                return new ServiceResponse
                {
                    Message = "Email was successfully confirmed!",
                    Success = true,
                };
            }

            return new ServiceResponse
            {
                Success = false,
                Message = "Email did not confirm",
                Errors = result.Errors.Select(e => e.Description)
            };
        }

        public async Task SendConfirmationEmailAsync(AppUser newUser)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

            var encodedEmailToken = Encoding.UTF8.GetBytes(token);
            var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

            string url = $"{_configuration["HostSettings:URL"]}/confirmEmail?userId={newUser.Id}&token={validEmailToken}";

            string emailBody = $"<h1>Confirm your email</h1> <a href='{url}'>Confirm now</a>";
            await _emailService.SendEmailAsync(newUser.Email, "Email confirmation.", emailBody);
        }

        public async Task SendResetPasswordEmailAsync(AppUser user)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var encodedEmailToken = Encoding.UTF8.GetBytes(token);
            var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

            string url = $"{_configuration["HostSettings:URL"]}/resetPassword?userId={user.Id}&token={validEmailToken}";

            string emailBody = $"<h1>To reset your password please follow the link below</h1> <a href='{url}'>Reset password</a>";
            await _emailService.SendEmailAsync(user.Email, "Password reset", emailBody);
        }


        public async Task<ServiceResponse> BlockUnblockAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Nothing was found",
                };
            }
            if (await _userManager.IsLockedOutAsync(user))
            {
                await _userManager.SetLockoutEndDateAsync(user, DateTime.Now);
            }
            else
            {
                await _userManager.SetLockoutEndDateAsync(user, DateTime.Now.AddMinutes(10));
            }
            await _userManager.UpdateAsync(user);
            if (await _userManager.IsLockedOutAsync(user))
            {
                return new ServiceResponse
                {
                    Success = true,
                    Message = "The user was blocked",
                    Payload = user
                };
            }
            return new ServiceResponse
            {
                Success = true,
                Message = "The user unblocked",
                Payload = user
            };
        }
    }
}
