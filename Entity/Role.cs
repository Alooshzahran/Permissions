using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Role : BaseEntity
    {
        public string Name { get; set; }
        public virtual ICollection<UserRole>? UserRoles { get; set;}
        //public virtual ICollection<ModuleProperties> ModuleProperties { get; set; }
        //public virtual ICollection<ModuleProperties_Role>? ModuleProperties_Role { get; set;}
        public virtual ICollection<UserModulePermission>? UserModulePermission { get; set; }

    }
}
