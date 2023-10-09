using Newtonsoft.Json.Linq;

namespace Permission_Api.Client
{
    public class ClientIdentityServer
    {
        readonly HttpClient httpClient;
        public ClientIdentityServer(HttpClient httpClient, IConfiguration config)
        {
            //httpClient = new HttpClient();
            this.httpClient = httpClient;
            this.httpClient.BaseAddress = new Uri(config.GetSection("IdentityServer:Url").Value);

        }

        public async Task<string> GetUserEmail(string AccessToken)
        {
            httpClient.DefaultRequestHeaders.Add("Authorization", AccessToken);
            var response = await httpClient.GetAsync("connect/userinfo");
            //var response = httpClient.GetAsync("connect/checksession").Result;
            var tokenResult = await response.Content.ReadAsStringAsync();
            var UserInfo = JObject.Parse(tokenResult);
            if (UserInfo.GetValue("email") != null)
                return UserInfo.GetValue("email").ToString();
            else
                if (UserInfo.GetValue("preferred_username") != null)
                return UserInfo.GetValue("preferred_username").ToString();

            return string.Empty;
        }
    }
}
