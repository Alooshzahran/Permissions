using Entity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryModuleProperties : Repository<ModuleProperties>, IRepositoryModuleProperties
    {
        public RepositoryModuleProperties(DBContext dBContext):base(dBContext) { }
    }
}
