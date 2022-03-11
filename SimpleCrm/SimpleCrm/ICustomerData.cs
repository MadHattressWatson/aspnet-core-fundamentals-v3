using System.Collections.Generic;


namespace SimpleCrm
{
    public interface ICustomerData
    {
        Customer Get(int id);
        List<Customer> GetAll(CustomerListParameters listParameters);

        /// <summary>
        /// Gets paged and sorted records for a given CRM account and status.
        /// </summary>

        /// <param name="pageIndex">The zero based page number</param>
        /// <param name="take">The max number of records to take (page size)</param>
        /// <param name="orderBy">The property name to order by and optional direction. (null for default order)</param>
        /// <returns></returns>
        
        void Add(Customer customer);
        void Update(Customer customer);
        /// <summary>
        /// Marks an item as deleted, to be saved on the next commit.
        /// </summary>
        /// <param name="item"><</param>

        void Delete(Customer item);
        ///<summary>
        /// Saves changes to new or modified customers.
        /// </summary>
        void Commit();  
    }
}

  