using Compass.Core.DTO_s;
using Compass.Core.Interfaces;
using Compass.Core.Services.User;
using Compass.Core.Validation.Category;
using Compass.Core.Validation.Course;
using Compass.Core.Validation.Token;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Compass.Api.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly UserService _userService;
        public CategoryController(ICategoryService categoryService, UserService userService)
        {
            _categoryService = categoryService;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpGet("categories")]
        public async Task<IActionResult> Index()
        {
            return Ok(await _categoryService.GetAll()); 
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CategoryDto model)
        {
            var validator = new AddCategoryValidation();
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                return Ok(await _categoryService.Create(model));
            }
            return BadRequest(validationResult.Errors);
        }
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _categoryService.Delete(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update(CategoryDto model)
        {
            var result = await _categoryService.Update(model);
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
