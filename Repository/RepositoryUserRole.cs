using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryUserRole : Repository<UserRole>, IRepositoryUserRole
    {
        public RepositoryUserRole(DBContext dBContext) : base(dBContext) { }
    }
}
