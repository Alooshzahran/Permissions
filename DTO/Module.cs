using DTO.Helpers;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Module : Base
    {
        public string? Name { get; set; }
        public string? Url { get; set; }
        public string? File { get; set; }
        public virtual ICollection<UserRole>? UserRoles { get; set; }
    }
    public class ModuleValidation : GenericValidator<Module>
    {
        private readonly IUnitOfWork _unitOfWork;
        public ModuleValidation(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
            When(e => e.ID == 0 || (e.ID > 0 && e.IsDeleted == false), () =>
            {
                RuleFor(x => x.Name).NotNull().WithErrorCode("1011");
                RuleFor(x => x.Name).NotEmpty().WithErrorCode("1012");
            });
            When(e => e.ID == 0, () =>
            {
                RuleFor(x => x.File).NotNull().WithErrorCode("1011");
                RuleFor(x => x.File).NotEmpty().WithErrorCode("1012");
            });
        }
    }
}
