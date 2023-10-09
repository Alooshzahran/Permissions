using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ModuleProperty_Role : Base
    {
        public int ModulePropertiesID { get; set; }
        public int RoleID { get; set; }

        public virtual Role? Role { get; set; }
        public virtual ModuleProperties? ModuleProperties { get; set; }
    }
}
