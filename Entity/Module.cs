using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Module : BaseEntity
    {
        public string Name { get; set; }
        public string? Url { get; set; }
        public string File { get; set; }

        public virtual ICollection<UserRole>? UserRoles { get; set;}
        public virtual ICollection<ModuleProperties>? ModuleProperties { get; set;}
        public virtual ICollection<UserModulePermission>? UserModulePermission { get; set; }
    }
}
