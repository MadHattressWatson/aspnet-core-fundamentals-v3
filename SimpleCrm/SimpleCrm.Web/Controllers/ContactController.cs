using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace SimpleCrm.Web.Controllers
{
    [Route("contact")]
    public class ContactController
    {
        [Route("ph")]
        public string Phone()
        {
            return "314-555-1234";
        }
        [Route("")]
        public string Name ()
        {
            return "Jennifer";
        }
    }
}
