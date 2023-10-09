using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Connecter.Client.Models;
using System.Net.Http.Headers;

namespace Connecter.Client
{
    public class ClientUserModulePermission
    {
        private readonly HttpClient _httpClient;
        private readonly ServiceSettings serviceSettings;

        public ClientUserModulePermission(HttpClient httpClient, IOptions<ServiceSettings> serviceSettings, IHttpContextAccessor httpContext)
        {
            httpClient.BaseAddress = new Uri(serviceSettings.Value.ClientHost);
            this._httpClient = httpClient;
            this.serviceSettings = serviceSettings.Value;
            var AccessToken = Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.GetTokenAsync(httpContext.HttpContext, "access_token").Result;
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);
        }

        public async Task<IEnumerable<DTO.UserModulePermission>> GetAll()
        {
            HttpResponseMessage Response = await _httpClient.GetAsync("UserModulePermission/GetAll");
            if (Response.IsSuccessStatusCode)
            {
                List<DTO.UserModulePermission> UserModulePermissions = JsonConvert.DeserializeObject<IEnumerable<DTO.UserModulePermission>>(Response.Content.ReadAsStringAsync().Result).ToList();
                return UserModulePermissions;
            }
            return null;
        }

        public async Task<DTO.UserModulePermission> GetByID(int ID)
        {
            HttpResponseMessage Response = await _httpClient.GetAsync($"UserModulePermission/GetByID?ID={ID}");
            if (Response.IsSuccessStatusCode)
            {
                DTO.UserModulePermission UserModulePermission = JsonConvert.DeserializeObject<DTO.UserModulePermission>(Response.Content.ReadAsStringAsync().Result);
                return UserModulePermission;
            }
            return null;
        }

        public async Task<Response> Create(DTO.UserModulePermission UserModulePermission)
        {
            StringContent UserModulePermissionStringfy = new StringContent(JsonConvert.SerializeObject(UserModulePermission), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync("UserModulePermission/Create", UserModulePermissionStringfy);

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


        public async Task<Response> Update(DTO.UserModulePermission UserModulePermission)
        {
            StringContent UserModulePermissionStringfy = new StringContent(JsonConvert.SerializeObject(UserModulePermission), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync("UserModulePermission/Update", UserModulePermissionStringfy);

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
        public async Task<DTO.UserModulePermission> Delete(DTO.UserModulePermission UserModulePermission)
        {

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri(serviceSettings.ClientHost + "UserModulePermission/Delete"),
                Content = new StringContent(JsonConvert.SerializeObject(UserModulePermission), System.Text.Encoding.UTF8, "application/json")
            };

            HttpResponseMessage Response = await _httpClient.SendAsync(request);
            //HttpResponseMessage Response = await _httpClient.SendAsync(request);
            if (Response.IsSuccessStatusCode)
            {
                string result = await Response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<DTO.UserModulePermission>(result);
            }
            else
            {
                return null;
            }
        }



    }
}
