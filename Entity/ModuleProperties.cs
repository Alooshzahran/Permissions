using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class ModuleProperties:BaseEntity
    {
        public string ControllerName { get; set; }
        public string ActionName { get; set; }
        public string MethodType { get; set; }

        public int ModuleID { get; set; }
        public virtual Module? Module { get; set; }

        //public int RoleID { get; set; }
        //public virtual ICollection<Role> Role { get; set; }
        //public virtual ICollection<ModuleProperties_Role>? ModuleProperties_Role { get; set; }

    }
}
