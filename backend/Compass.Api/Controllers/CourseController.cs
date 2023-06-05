using Compass.Core.DTO_s;
using Compass.Core.Interfaces;
using Compass.Core.Services.User;
using Compass.Core.Validation.Course;
using Compass.Core.Validation.Token;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Compass.Api.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly UserService _userService;
        public CourseController(ICourseService courseService, UserService userService)
        {
            _courseService = courseService;
            _userService = userService;
        }


        [AllowAnonymous]
        [HttpGet("courses")]
        public async Task<IActionResult> Index()
        {
            var result = await _courseService.GetAll();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("courses-by-category")]
        public async Task<IActionResult> GetAllByCategory(int id)
        {
            var result = await _courseService.GetByCategory(id);
            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CourseDto model)
        {
            var validator = new AddCourseValidation();
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                return Ok(await _courseService.Create(model));
            }
            return BadRequest(validationResult.Errors);
        }
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _courseService.Delete(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update(CourseDto model)
        {
            var result = await _courseService.Update(model);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Errors);
        }

        [AllowAnonymous]
        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequestDto model)
        {
            var validator = new TokenRequestValidation();
            var validatinResult = await validator.ValidateAsync(model);
            if (validatinResult.IsValid)
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
                return BadRequest(validatinResult.Errors);
            }
        }
    }

}
