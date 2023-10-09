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
    public class ModuleProperties : Base
    {
        public string? ControllerName { get; set; }
        public string? ActionName { get; set; }
        public string? MethodType { get; set; }
        public int? ModuleID { get; set; }
        public virtual Module? Module { get; set; }

        //public int RoleID { get; set; }
        //public virtual Role Role { get; set; }
        public class ModulePropertiesValidation : GenericValidator<ModuleProperties>
        {
            private readonly IUnitOfWork _unitOfWork;
            public ModulePropertiesValidation(IUnitOfWork unitOfWork) : base(unitOfWork)
            {
                _unitOfWork = unitOfWork;
                When(e => e.ID == 0 || (e.ID > 0 && e.IsDeleted == false), () =>
                {
                    RuleFor(x => x.ControllerName).NotNull().WithErrorCode("1011");
                    RuleFor(x => x.ControllerName).NotEmpty().WithErrorCode("1012");
                    RuleFor(x => x.ActionName).NotNull().WithErrorCode("1011");
                    RuleFor(x => x.ActionName).NotEmpty().WithErrorCode("1012");
                    RuleFor(x => x.MethodType).NotNull().WithErrorCode("1011");
                    RuleFor(x => x.MethodType).NotEmpty().WithErrorCode("1012");
                    RuleFor(x => x.ModuleID).NotNull().WithErrorCode("1011");
                    When(x => x.ModuleID != null, () =>
                    {
                        RuleFor(x => x.ModuleID).Must(BeAValidModuleID).WithErrorCode("1023");
                    });


                });
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
        }

    }
}
