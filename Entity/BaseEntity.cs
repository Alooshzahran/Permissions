using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class BaseEntity : BaseGet
    {
        public int CreationUserID { get; set; }
        public DateTime CreationDate { get; set; }
        public int? ModifyingUserID { get; set; }
        public DateTime? ModifyingDate { get; set; }
        public int? DeleteUserID { get; set; }
        public DateTime? DeleteDate { get; set; }
        //public virtual User? CreateUser {  get; set; }
        //public virtual User? ModifyUser { get; set; }
        //public virtual User? DeleteUser { get; set; }
    }
}
