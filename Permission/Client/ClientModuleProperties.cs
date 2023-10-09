using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Connecter.Client.Models;
using System.Net.Http.Headers;

namespace Connecter.Client
{
    public class ClientModuleProperties
    {
        private readonly ServiceSettings _serviceSettings;
        private readonly HttpClient _httpClient;

        public ClientModuleProperties(HttpClient httpClient, IOptions<ServiceSettings> serviceSettings, IHttpContextAccessor httpContext)
        {
            httpClient.BaseAddress = new Uri(serviceSettings.Value.ClientHost);
            this._httpClient = httpClient;
            this._serviceSettings = serviceSettings.Value;
            var AccessToken = Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.GetTokenAsync(httpContext.HttpContext, "access_token").Result;
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);

        }

        public async Task<IEnumerable<DTO.ModuleProperties>> GetAll()
        {
            HttpResponseMessage Response = await _httpClient.GetAsync("ModuleProperties/GetAll");
            if (Response.IsSuccessStatusCode)
            {
                List<DTO.ModuleProperties> ModulePropertiess = JsonConvert.DeserializeObject<IEnumerable<DTO.ModuleProperties>>(Response.Content.ReadAsStringAsync().Result).ToList();
                return ModulePropertiess;
            }
            return null;
        }

        public async Task<DTO.ModuleProperties> GetByID(int ID)
        {
            HttpResponseMessage Response = await _httpClient.GetAsync($"ModuleProperties/GetByID?ID={ID}");
            if (Response.IsSuccessStatusCode)
            {
                DTO.ModuleProperties ModuleProperties = JsonConvert.DeserializeObject<DTO.ModuleProperties>(Response.Content.ReadAsStringAsync().Result);
                return ModuleProperties;
            }
            return null;
        }

        public async Task<Response> Create(DTO.ModuleProperties ModuleProperties)
        {
            StringContent ModulePropertiesStringfy = new StringContent(JsonConvert.SerializeObject(ModuleProperties), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync("ModuleProperties/Create", ModulePropertiesStringfy);

            if (Response.IsSuccessStatusCode)
            {
                return new Response
                {
                    IsSuccess = true,
                    Date = DateTime.Now,
                    Result = new JObject(),
                    StatusCode = Response.StatusCode,
                    userId = 1 //Must Change
                };
            }
            else
            {

                var Errors = JsonConvert.DeserializeObject<Failed>(await Response.Content.ReadAsStringAsync());

                return new Response
                {
                    IsSuccess = false,
                    Date = DateTime.Now,
                    Result = Errors.Errors,
                    StatusCode = Response.StatusCode,
                    userId = 1 //Must Change
                };
            }
        }


        public async Task<Response> Update(DTO.ModuleProperties ModuleProperties)
        {
            StringContent ModulePropertiesStringfy = new StringContent(JsonConvert.SerializeObject(ModuleProperties), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync("ModuleProperties/Update", ModulePropertiesStringfy);

            if (Response.IsSuccessStatusCode)
            {
                return new Response
                {
                    IsSuccess = true,
                    Date = DateTime.Now,
                    Result = new JObject(),
                    StatusCode = Response.StatusCode,
                    userId = 1 //Must Change
                };
            }
            else
            {

                var Errors = JsonConvert.DeserializeObject<Failed>(await Response.Content.ReadAsStringAsync());

                return new Response
                {
                    IsSuccess = false,
                    Date = DateTime.Now,
                    Result = Errors.Errors,
                    StatusCode = Response.StatusCode,
                    userId = 1 //Must Change
                };
            }
        }
        [HttpDelete]
        public async Task<DTO.ModuleProperties> Delete(DTO.ModuleProperties ModuleProperties)
        {

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri(_serviceSettings.ClientHost + "ModuleProperties/Delete"),
                Content = new StringContent(JsonConvert.SerializeObject(ModuleProperties), System.Text.Encoding.UTF8, "application/json")
            };

            HttpResponseMessage Response = await _httpClient.SendAsync(request);
            //HttpResponseMessage Response = await _httpClient.SendAsync(request);
            if (Response.IsSuccessStatusCode)
            {
                string result = await Response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<DTO.ModuleProperties>(result);
            }
            else
            {
                return null;
            }
        }

    }
}
