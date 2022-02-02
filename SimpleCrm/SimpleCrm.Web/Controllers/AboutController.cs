namespace SimpleCrm.Web.Controllers
{
    public class AboutController
    {
        public string List(string phone)
        {
            return "phone";
        }
        public string Address(string id)
        {
            return id;
        }
        
        public string Find (string id)
        {
            string result = "USA" + id;

            return result;

        }
    }
}
