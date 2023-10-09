using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Connecter.Client.Models;
using System.Net.Http.Headers;

namespace Connecter.Client
{
    public class ClientResource 
    {
        public readonly HttpClient _HttpClient;
        public readonly ServiceSettings _ServiceSetting;
        public ClientResource(HttpClient httpClient, IOptions<ServiceSettings> serviceSetting, IHttpContextAccessor httpContext)
        {
            httpClient.BaseAddress = new Uri(serviceSetting.Value.ResourceHost);
            _HttpClient = httpClient;
            _ServiceSetting = serviceSetting.Value;
            var AccessToken = Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.GetTokenAsync(httpContext.HttpContext, "access_token").Result;
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);
        }

        public async Task<IEnumerable<Resource>> GetAll()
        {
            HttpResponseMessage response = await _HttpClient.GetAsync($"Resource/GetAll");
            if (response.IsSuccessStatusCode)
            {
                string objReponse = await response.Content.ReadAsStringAsync();
                var resource = JsonConvert.DeserializeObject<IEnumerable<Resource>>(objReponse);
                return resource;
            }
            return null;
        }

        public async Task<IEnumerable<Language>> GetLanguageAll()
        {
            HttpResponseMessage response = await _HttpClient.GetAsync($"Language/GetAll");
            if (response.IsSuccessStatusCode)
            {
                string objReponse = await response.Content.ReadAsStringAsync();
                var language = JsonConvert.DeserializeObject<IEnumerable<Language>>(objReponse);
                return language;
            }
            return null;
        }

        public async Task<IEnumerable<CodeType>> GetCodeTypeAll()
        {
            HttpResponseMessage response = await _HttpClient.GetAsync($"CodeType/GetAll");
            if (response.IsSuccessStatusCode)
            {
                string objReponse = await response.Content.ReadAsStringAsync();
                var codeType = JsonConvert.DeserializeObject<IEnumerable<CodeType>>(objReponse);
                return codeType;
            }
            return null;
        }
    }
}
