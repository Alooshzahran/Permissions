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
    public class UserRole : Base
    {
        public int? UserID { get; set; }
        public virtual User? User { get; set; }
        public int? ModuleID { get; set; }
        public virtual Module? Module { get; set; }
        public int? RoleID { get; set; }
        public virtual Role? Role { get; set; }
    }
    public class UserRoleValidation : GenericValidator<UserRole>
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserRoleValidation(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
            When(e => e.ID == 0 || (e.ID > 0 && e.IsDeleted == false), () =>
            {
                RuleFor(x => x.UserID).NotNull().WithErrorCode("1011");     
                When(x => x.UserID != null, () =>
                {
                    RuleFor(x => x.UserID).Must(BeAValidUserID).WithErrorCode("1023");
                });
                RuleFor(x => x.ModuleID).NotNull().WithErrorCode("1011");
                When(x => x.ModuleID != null, () =>
                {
                    RuleFor(x => x.ModuleID).Must(BeAValidModuleID).WithErrorCode("1023");
                });
                RuleFor(x => x.RoleID).NotNull().WithErrorCode("1011");
                When(x => x.RoleID != null, () =>
                {
                    RuleFor(x => x.RoleID).Must(BeAValidRoleID).WithErrorCode("1023");
                });
            });

        }
        private bool BeAValidUserID(int? ID)
        {
            var x = _unitOfWork.User.GetByID(ID ?? 0) != null;
            if (x)
            {
                return true;
            }
            return false;
        }

        private bool BeAValidModuleID(int? ID)
        {
            var x = _unitOfWork.Module.GetByID(ID ?? 0) != null;
            if (x)
            {
                return true;
            }
            return false;
        }
        private bool BeAValidRoleID(int? ID)
        {
            var x = _unitOfWork.Role.GetByID(ID ?? 0) != null;
            if (x)
            {
                return true;
            }
            return false;
        }
    }
}
