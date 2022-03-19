using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using SimpleCrm.WebApi.Models;
using System;
using Microsoft.AspNetCore.Identity;

namespace SimpleCrm.WebApi.ApiControllers
{
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly UserManager<CrmUser> _userManager;
        public AuthController(UserManager<CrmUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody] CredentialsViewModel credentials)
        { 
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }

            
            var user = await Authenticate(credentials.EmailAddress, credentials.Password);
            if (user == null)
            {
                return UnprocessableEntity("Invalid username or password.");
            }

            
            var userModel = await GetUserData(user);
            // returns a UserSummaryViewModel containing a JWT and other user info
            return Ok(userModel);
        }

        [Authorize(Policy = "ApiUser")]
        private async Task<CrmUser> Authenticate(string emailAddress, string password)
        {
            if(string.IsNullOrEmpty(emailAddress) || string.IsNullOrEmpty(password))
               return await Task.FromResult<CrmUser>(null);

            var userToVerify = await _userManager.FindByNameAsync(emailAddress);

            if (userToVerify == null) return await Task.FromResult<CrmUser>(null);

            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(userToVerify);
            }
            return await Task.FromResult<CrmUser> (null);
        }
    }
}