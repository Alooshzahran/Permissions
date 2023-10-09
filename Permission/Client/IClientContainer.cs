namespace Connecter.Client
{
    public interface IClientContainer
    {
        ServiceSettings ServiceSettings { get; }
        ClientRole Role { get; }
        ClientUser User { get; }
        ClientModule Module { get; }
        ClientUserRole UserRole { get; }
        ClientModuleProperties ModuleProperties { get; }
        ClientUserModulePermission UserModulePermission  { get; }

        Dictionary<string, Dictionary<string,string>> ResourcesDic { get; }

    }
}
