using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IRepositoryUser User { get; }
        IRepositoryRole Role { get; }
        IRepositoryUserRole UserRole { get; }
        IRepositoryModule Module { get; }
        IRepositoryModuleProperties ModuleProperties { get; }
        IRepositoryUserModulePermission UserModulePermission { get; }
        void Complete();
    }
}
