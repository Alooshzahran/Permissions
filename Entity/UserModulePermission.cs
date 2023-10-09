using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class UserModulePermission:BaseEntity
    {
        public int ModuleID { get; set; }
        public string ControllerName { get; set; }
        public string ActionName { get; set; }
        public int UserID { get; set; }
        public int RoleID { get; set; }

        public virtual Module? Module { get; set; }
        public virtual User? User { get; set; }
        public virtual Role? Role  { get; set; }


    }
}
