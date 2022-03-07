﻿namespace SimpleCrm.WebApi.Models
{
    public class CustomerDisplayViewModel
    {
        private Customer c;

        public CustomerDisplayViewModel(Customer c)
        {
            this.c = c;
        }

        public int CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public string PreferredContactMethod { get; set; }
        public string Status { get; set; }
        public string LastContactDate { get; set; }
    }
}