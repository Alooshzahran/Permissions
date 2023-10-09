using DTO.Helpers;
using FluentValidation;
using Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class User : Base
    {  
        [StringLength(50)]
        public string? Name { get; set; }
        [StringLength(150)]
        public string? Email { get; set; }
        public bool? IsActive { get; set; }
        public virtual ICollection<UserRole>? UserRoles { get; set; }
    }
    public class UserValidation : GenericValidator<User>
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserValidation(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
            When(e => e.ID == 0 || (e.ID > 0 && e.IsDeleted == false), () =>
            {
                RuleFor(x => x.Name).NotNull().WithErrorCode("1011");
                RuleFor(x => x.Name).NotEmpty().WithErrorCode("1012");
                RuleFor(x => x.Email).NotNull().WithErrorCode("1011");
                RuleFor(x => x.Email).NotEmpty().WithErrorCode("1012");
            });
       
        }
    }
}
