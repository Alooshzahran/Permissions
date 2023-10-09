using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class UserRole : BaseEntity
    {
        public int UserID { get; set; }
        public virtual User? User { get; set; }
        public int ModuleID { get; set; }
        public virtual Module? Module { get; set; }
        public int RoleID { get; set; }
        public virtual Role? Role { get; set; }
    }
}
