using System.ComponentModel.DataAnnotations;

namespace SimpleCrm.WebApi.Auth
{
    public class RegisterViewModel
    {
        [Required]
        public string Name { get; set; }    
        public string EmailAddress { get; set; }

        [Required]
        public string Password { get; set; }
                

    }
}
