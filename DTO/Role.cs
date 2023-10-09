using DTO.Helpers;
using FluentValidation;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Role : Base
    {
        public string? Name { get; set; }
        //public virtual ICollection<UserRole>? UserRoles { get; set; }
    }

    public class RoleValidation : GenericValidator<Role>{
        private readonly IUnitOfWork _unitOfWork;
        public RoleValidation(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
            When(e => e.ID == 0 || (e.ID > 0 && e.IsDeleted == false), () =>
            {
                RuleFor(x => x.Name).NotNull().WithErrorCode("1011");
                RuleFor(x => x.Name).NotEmpty().WithErrorCode("1012");
            });
        }
    }

}
