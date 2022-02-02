using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using SimpleCrm.Web.Models;

namespace SimpleCrm.Web.Controllers
{
    public class HomeControler : Controller
    {
        public IActionResult Index()
        {
          var model = new CustomerModel
            {
                Id = 1,
                FirstName = "John",
                LastName = "Doe",
                PhoneNumber = "555-555-1234"
            };
            return View(model);
              
        }
    }
}
