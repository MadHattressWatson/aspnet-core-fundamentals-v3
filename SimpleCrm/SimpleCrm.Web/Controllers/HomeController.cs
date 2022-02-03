using Microsoft.AspNetCore.Mvc;

namespace SimpleCrm.Web.Controllers
{
    public class HomeControler : Controller
    {
        private ICustomerData _customerData;

        public HomeController(ICustomerData customerData)
        { 
            _customerData = customerData;
        }     
        
        public IActionResult Index()
        {
            var model = _CustomerData.GetAll();
            return View(model);
              
        }
    }
}
