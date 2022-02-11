using System.Collections.Generic;

namespace SimpleCrm.Web.Models.Home
{
    public class HomePageViewModel
    {
        public string CurrentMessage { get; set; }
        public IList<Customer> Customers { get; set; }
    }
}
