namespace SimpleCrm.WebApi.Models
{
    public class CustomerUpdateViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public InteractionMethod PreferredContactMethod { get; set; }
    }
}
