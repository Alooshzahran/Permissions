using Microsoft.Extensions.Options;

namespace Connecter.Client
{
    public class ClientContainer : IClientContainer
    {
        public ServiceSettings ServiceSettings { get; private set; }
        public ClientRole Role { get; private set; }
        public ClientUser User { get; private set; }
        public ClientModule Module { get; private set; }
        public ClientUserRole UserRole { get; private set; }
        public ClientModuleProperties ModuleProperties { get; private set; }
        public ClientUserModulePermission UserModulePermission { get; private set; }

        public Dictionary<string, Dictionary<string, string>> ResourcesDic { get; private set; }

        public ClientContainer(HttpClient httpClient, IOptions<ServiceSettings> serviceSettings, IHttpContextAccessor httpContext , Dictionary<string, Dictionary<string, string>> _ResourcesDic) 
        {
            ServiceSettings = serviceSettings.Value;
            Role = new ClientRole(httpClient, serviceSettings, httpContext);
            User = new ClientUser(httpClient, serviceSettings, httpContext);
            Module = new ClientModule(httpClient, serviceSettings, httpContext);
            UserRole = new ClientUserRole(httpClient, serviceSettings, httpContext);
            ModuleProperties = new ClientModuleProperties(httpClient, serviceSettings, httpContext);
            UserModulePermission=new ClientUserModulePermission(httpClient, serviceSettings, httpContext);
            ResourcesDic = _ResourcesDic;
        }


    }
}
