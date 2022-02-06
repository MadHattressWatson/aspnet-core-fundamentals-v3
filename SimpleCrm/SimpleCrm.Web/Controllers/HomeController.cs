using Microsoft.AspNetCore.Mvc;
using SimpleCrm.Web.Models.Home;
using System.Collections.Generic;

namespace SimpleCrm.Web.Controllers
{
    public class HomeController : Controller
    {
        private ICustomerData _customerData;
        private readonly IGreeter _greeter;

        public IEnumerable<Customer> Customers { get; private set; }
        public string CurrentMessage { get; private set; }

        public HomeController(ICustomerData customerData, IGreeter greeter)
        { 
            _customerData = customerData;
            _greeter = greeter;
        }     
        
        public IActionResult Index()
        {
            var model = new HomePageViewModel();
            Customers = _customerData.GetAll();
            CurrentMessage = _greeter.GetGreeting();

            return View(model);
        } 
        
    }
}
