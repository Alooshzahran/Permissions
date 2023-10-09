using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Connecter.Client
{
    public class ClientContainer : IClientContainer
    {
        public ServiceSettings ServiceSettings { get; private set; }
        public IClient<Role> Role { get; private set; }
        public IClient<User> User { get; private set; }
        public IClientModule Module { get; private set; }
        public IClient<UserRole> UserRole { get; private set; }
        public IClient<ModuleProperties> ModuleProperties { get; private set; }
        public IClient<UserModulePermission> UserModulePermission { get; private set; }

        public Dictionary<string, Dictionary<string, string>> ResourcesDic { get; private set; }

        public ClientContainer(HttpClient httpClient, IOptions<ServiceSettings> serviceSettings, IHttpContextAccessor httpContext, Dictionary<string, Dictionary<string, string>> _ResourcesDic)
        {
            ServiceSettings = serviceSettings.Value;
            Role = new Client<Role>(httpClient, serviceSettings, httpContext);
            User = new Client<User>(httpClient, serviceSettings, httpContext);
            Module = new ClientModule(httpClient, serviceSettings, httpContext);
            UserRole = new Client<UserRole>(httpClient, serviceSettings, httpContext);
            ModuleProperties = new Client<ModuleProperties>(httpClient, serviceSettings, httpContext);
            UserModulePermission = new Client<UserModulePermission>(httpClient, serviceSettings, httpContext);
            ResourcesDic = _ResourcesDic;
        }


    }
}
