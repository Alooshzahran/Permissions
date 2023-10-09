using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class User : BaseEntity
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(150)]
        public string Email { get; set; }

        [Required]
        public bool IsActive { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set;}
        public virtual ICollection<UserModulePermission>? UserModulePermission { get; set; }


    }
}
