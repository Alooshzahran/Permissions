using DTO;

namespace Connecter.Client
{
    public interface IClientContainer
    {
        ServiceSettings ServiceSettings { get; }
        IClient<Role> Role { get; }
        IClient<User> User { get; }
        IClientModule Module { get; }
        IClient<UserRole> UserRole { get; }
        IClient<ModuleProperties> ModuleProperties { get; }
        IClient<UserModulePermission> UserModulePermission  { get; }

        Dictionary<string, Dictionary<string,string>> ResourcesDic { get; }

    }
}
