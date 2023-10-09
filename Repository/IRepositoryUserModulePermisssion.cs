using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public  interface IRepositoryUserModulePermission:IRepository<UserModulePermission>
    {
        void DeleteAllForUser(int UserID, int ModuleID, int RoleID);
    }
}
