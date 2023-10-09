using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryModule : Repository<Module>, IRepositoryModule
    {
        public RepositoryModule(DBContext dbContext) : base(dbContext) { }
    }
}
