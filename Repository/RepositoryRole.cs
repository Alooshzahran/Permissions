using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryRole : Repository<Role>, IRepositoryRole
    {
        public RepositoryRole(DBContext dbContext):base(dbContext) { }
    }
}
