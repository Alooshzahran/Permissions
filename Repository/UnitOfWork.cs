using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly DBContext _dbContext;

        public IRepositoryUser User { get; private set; }

        public IRepositoryRole Role { get; private set; }

        public IRepositoryUserRole UserRole { get; private set; }

        public IRepositoryModule Module { get; private set; }
        public IRepositoryModuleProperties ModuleProperties { get; private set; }
        
        public IRepositoryUserModulePermission UserModulePermission { get; private set; } 

        public UnitOfWork(DBContext dbContext)
        {
            _dbContext = dbContext;
            User = new RepositoryUser(dbContext);
            Role = new RepositoryRole(dbContext);
            Module = new RepositoryModule(dbContext);
            UserRole = new RepositoryUserRole(dbContext);
            ModuleProperties = new RepositoryModuleProperties(dbContext);
            UserModulePermission = new RepositoryUserModulePermission(dbContext);
        }

        public void Complete()
        {
            _dbContext.SaveChanges();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }
    }
}
