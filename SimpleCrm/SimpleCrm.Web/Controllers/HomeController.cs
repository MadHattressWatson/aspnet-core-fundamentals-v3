using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Threading.Tasks;
using System.Linq;

namespace SimpleCrm.Web.Controllers
{
    [Description()]
    public class HomeControler
    { 
        [Description("")]
        public int MyProperty { get; set; }
        public string Index()
        {
            return "Hello from a Controller ";
        }
    }
};
