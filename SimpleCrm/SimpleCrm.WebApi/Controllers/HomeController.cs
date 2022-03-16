using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SimpleCrm.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleCrm.WebApi.Controllers
{
    [Route("")]
    public class HomeController : Controller
    {
        [Route("home")]
        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 30, Location = ResponseCacheLocation.Any)]
        [Route("privacy")]
        public IActionResult Privacy()
        {
            return View();
        }
        [ResponseCache(Duration = 30, Location = ResponseCacheLocation.Any)]
        [Route("corporate")]
        public IActionResult CorporateClients()
        {
            return View();
        }
        [ResponseCache(Duration = 30, Location = ResponseCacheLocation.Any)]
        [Route("pricing")]
        public IActionResult Pricing()
        {
            return View();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [Route("error")]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}