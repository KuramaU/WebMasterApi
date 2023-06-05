using Compass.Core.DTO_s;
using Compass.Core.Services.User;
using Compass.Core.Validation.Token;
using Compass.Core.Validation.User;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Compass.Api.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> InsertAsync([FromBody] ResiterUserDto model)
        {
            var validator = new RegisterUserValidation();
            var validatinResult = await validator.ValidateAsync(model);
            if (validatinResult.IsValid)
            {
                var result = await _userService.InsertAsync(model);
                return Ok(result);
            }
            return BadRequest(validatinResult.Errors);
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginUserDto model)
        {
            var validator = new LoginUserValidation();
            var validatinResult = await validator.ValidateAsync(model);
            if (validatinResult.IsValid)
            {
                var result = await _userService.LoginAsync(model);
                return Ok(result);
            }
            return BadRequest(validatinResult.Errors);

        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllAsync()
        {
            var result = await _userService.GetAllAsync();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequestDto model)
        {
            var validator = new TokenRequestValidation();
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                var result = await _userService.RefreshTokenAsync(model);
                if (result.Success)
                {
                    return Ok(result);
                }
                return BadRequest(result);
            }
            else
            {
                return BadRequest(validationResult.Errors);
            }
        }

        [HttpGet("logout")]
        public async Task<IActionResult> LogOutAsync(string userId)
        {
            var result = await _userService.LogOutAsync(userId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateProfileAsync([FromBody] UpdateProfileDto model)
        {
            var validator = new UpdateProfileValidation();
            var validationresult = await validator.ValidateAsync(model);
            if (validationresult.IsValid)
            {
                var result = await _userService.UpdateProfileAsync(model);
                if (result.Success)
                {
                    return Ok(result);
                }
                return BadRequest(result);
            }
            return BadRequest(validationresult);
        }

        [HttpGet("delete")]
        public async Task<IActionResult> DeleteAsync(string userId)
        {
            var result = await _userService.DeleteAsync(userId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [AllowAnonymous]
        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPasswordDto model)
        {
            var validator = new ResetPasswordValidation();
            var validationResult = validator.Validate(model);

            if (validationResult.IsValid)
            {
                var result = await _userService.ResetPasswordAsync(model);
                if (result.Success)
                {
                    return Ok(result);
                }
                return BadRequest(result);
            }
            return BadRequest(validationResult);
        }

        [AllowAnonymous]
        [HttpGet("sendResetEmail")]
        public async Task<IActionResult> SendResetEmailAsync(string email)
        {
            var result = await _userService.SendResetEmailAsync(email);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        [AllowAnonymous]
        [HttpPost("сonfirmEmail")]
        public async Task<IActionResult> ConfirmEmailAsync([FromBody] ConfirmEmailDto model)
        {
            if (string.IsNullOrWhiteSpace(model.Id) || string.IsNullOrWhiteSpace(model.Token))
                return NotFound();

            var result = await _userService.ConfirmEmailAsync(model);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        [HttpGet("blockUnblock")]
        public async Task<IActionResult> BlockUnblockAsync(string userId)
        {
            var result = await _userService.BlockUnblockAsync(userId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
