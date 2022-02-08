using Microsoft.AspNetCore.Mvc;

namespace SimpleCrm.Web.Models.Home
{
    public class CustomerEditViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public bool OptInNewsletter { get; set; }
        public CustomerType Type { get; set; }
    }

    [HttpPost()]
    public IActionResult Create(CustomerEditViewModel model)
    {
        var customer = new Customer
        {
        FirstName = model.FirstName,
        LastName = model.LastName,
        PhoneNumber = model.PhoneNumber,
        OptInNewsletter = model.OptInNewsletter,
        Type = model.Type
        };
        _customerData.Save(customer);
    
        return RedirectToAction(nameof(Details), new { id = customer.Id}); 
    }

}
