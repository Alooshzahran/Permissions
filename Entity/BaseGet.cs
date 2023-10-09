using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class BaseGet : IBaseGet
    {
        [Key]
        public int ID { get; set; }
        public bool IsDeleted { get; set; }
    }
}
