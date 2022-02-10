﻿using Microsoft.EntityFrameworkCore;
using System;

namespace SimpleCrm.SqlDbServices1
{
    public class SimpleCrmDbContext : DbContext
    {
        public SimpleCrmDbContext(DbContextOptions<SimpleCrmDbContext> options)
            : base(options)
        {

        }

        public DbSet<Customer> Customers { get; set; }
    }
}
