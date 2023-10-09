using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Connecter.Client.Models;
using System.Net.Http.Headers;

namespace Connecter.Client
{
    public class ClientUserRole
    {
        private readonly HttpClient _httpClient;
        private readonly ServiceSettings serviceSettings;

        public ClientUserRole(HttpClient httpClient, IOptions<ServiceSettings> serviceSettings, IHttpContextAccessor httpContext)
        {
            httpClient.BaseAddress = new Uri(serviceSettings.Value.ClientHost);
            this._httpClient = httpClient;
            this.serviceSettings = serviceSettings.Value;
            var AccessToken = Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.GetTokenAsync(httpContext.HttpContext, "access_token").Result;
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);
        }
        public async Task<IEnumerable<DTO.UserRole>> GetAll()
        {
            HttpResponseMessage Response = await _httpClient.GetAsync("UserRole/GetAll");
            if (Response.IsSuccessStatusCode)
            {
                List<DTO.UserRole> UserRole = JsonConvert.DeserializeObject<IEnumerable<DTO.UserRole>>(Response.Content.ReadAsStringAsync().Result).ToList();
                return UserRole;
            }
            return null;
        }

        public async Task<DTO.UserRole> GetByID(int ID)
        {
            HttpResponseMessage Response = await _httpClient.GetAsync($"UserRole/GetByID?ID={ID}");
            if (Response.IsSuccessStatusCode)
            {
                DTO.UserRole UserRole = JsonConvert.DeserializeObject<DTO.UserRole>(Response.Content.ReadAsStringAsync().Result);
                return UserRole;
            }
            return null;
        }

        public async Task<Response> Create(DTO.UserRole UserRole)
        {
            StringContent UserRoleStringfy = new StringContent(JsonConvert.SerializeObject(UserRole), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync("UserRole/Create", UserRoleStringfy);

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


        public async Task<Response> Update(DTO.UserRole UserRole)
        {
            StringContent UserRoleStringfy = new StringContent(JsonConvert.SerializeObject(UserRole), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync("UserRole/Update", UserRoleStringfy);

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
        public async Task<DTO.UserRole> Delete(DTO.UserRole UserRole)
        {

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri(serviceSettings.ClientHost + "UserRole/Delete"),
                Content = new StringContent(JsonConvert.SerializeObject(UserRole), System.Text.Encoding.UTF8, "application/json")
            };

            HttpResponseMessage Response = await _httpClient.SendAsync(request);
            //HttpResponseMessage Response = await _httpClient.SendAsync(request);
            if (Response.IsSuccessStatusCode)
            {
                string result = await Response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<DTO.UserRole>(result);
            }
            else
            {
                return null;
            }
        }
    }
}
