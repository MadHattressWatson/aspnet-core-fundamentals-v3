using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace SimpleCrm.Web.Models.Home
{
    public class CustomerEditViewModel 
    {
        public int Id { get; set; }
        [Display(Name ="First Name")]
        [Required()]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Display(Name ="Last Name")]
        [MinLength(1), MaxLength(50)]
        [Required()]

        public string LastName { get; set; }
        [Display(Name = "Phone")]
        [MinLength(7), MaxLength(12)]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }

        public CustomerType Type { get; set; }

        [Display(Name = "Would you like to sign up for our Newsletter?")]

        public bool OptInNewsletter { get; set; }


        
    }
}
