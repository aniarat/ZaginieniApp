
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using zaginieni_webapp.Entities;
using zaginieni_webapp.Interfaces;
using zaginieni_webapp.Models;
using zaginieni_webapp.Services;

namespace zaginieni_webapp.Controllers
{
    [Route("api/account")]
    [ApiController] // 
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody]RegisterUserDto registerDto)
        {
            if (await EmailExists(registerDto.Email)) return BadRequest("E-mail jest zajęty");

            var user = _mapper.Map<User>(registerDto);

            user.Email = registerDto.Email.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto()
            {
                Email = user.Email,
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                //EmailConfirmed = user.EmailConfirmed,
                Token = await _tokenService.CreateToken(user)
            };


        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginUser(LoginDto loginDto)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());
            
            if (user == null) return Unauthorized("Nieprawidłowy adres e-mail lub hasło.");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Nieprawidłowy login lub hasło.");

            return new UserDto()
            {
                Email = user.Email,
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Token = await _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> EmailExists(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }
    }
}
