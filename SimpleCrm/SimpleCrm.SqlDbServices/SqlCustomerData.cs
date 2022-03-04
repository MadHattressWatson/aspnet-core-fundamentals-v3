using System.Collections.Generic;
using System.Linq;

namespace SimpleCrm.SqlDbServices
{
    public class SqlCustomerData : ICustomerData
    {
        private readonly SimpleCrmDbContext _context;
        public SqlCustomerData(SimpleCrmDbContext context)
        {
            _context = context;
        }        
        public Customer Get(int id)
        {
            return _context.Customers.FirstOrDefault(x => x.Id == id);
        }
        public IEnumerable<Customer> GetAll()
        {
            return _context.Customers.ToList();
        }
        public void Add(Customer customer)
        {
            _context.Customers.Add(customer);
            
        }
        public void Update(Customer customer)
        {         
             //update is not currently needed here
        }
        public void Commit()
        {
            _context.SaveChanges();
        }

    }
}
