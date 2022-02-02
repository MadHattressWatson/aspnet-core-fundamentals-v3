using Microsoft.AspNetCore.Mvc;

namespace SimpleCrm.Web.Controllers
{
    [Route("about")]
    public class AboutController
    {
        [Route("")]
        public string Phone()
        {
            return "555-555-1234";
        }
        public string Address()
        {
            return "USA";
        }
     
    }
}
