using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using DTO;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using Connecter.Client.Models;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Connecter.Client
{
    public class ClientRole
    {
        //private readonly ClientContainer _client;
        private readonly HttpClient _httpClient;
        private readonly ServiceSettings serviceSettings;

        public ClientRole(HttpClient httpClient, IOptions<ServiceSettings> serviceSettings, IHttpContextAccessor httpContext)
        {
            httpClient.BaseAddress = new Uri(serviceSettings.Value.ClientHost);
            this._httpClient = httpClient;
            this.serviceSettings = serviceSettings.Value;
            var AccessToken = Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.GetTokenAsync(httpContext.HttpContext, "access_token").Result;
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);
        }

        public async Task<IEnumerable<DTO.Role>> GetAll()
        {
            HttpResponseMessage Response = await _httpClient.GetAsync("Role/GetAll");
            if(Response.IsSuccessStatusCode)
            {
                List<DTO.Role> Roles = JsonConvert.DeserializeObject<IEnumerable<DTO.Role>>(Response.Content.ReadAsStringAsync().Result).ToList();
                return Roles;
            }
            return null;
        }

        public async Task<DTO.Role> GetByID(int ID)
        {
            HttpResponseMessage Response = await _httpClient.GetAsync($"Role/GetByID?ID={ID}");
            if (Response.IsSuccessStatusCode)
            {
                DTO.Role Role = JsonConvert.DeserializeObject<DTO.Role>(Response.Content.ReadAsStringAsync().Result);
                return Role;
            }
            return null;
        }

        public async Task<Response> Create(DTO.Role Role)
        {
            StringContent RoleStringfy = new StringContent(JsonConvert.SerializeObject(Role), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync("Role/Create", RoleStringfy);

            if(Response.IsSuccessStatusCode)
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


        public async Task<Response> Update(DTO.Role Role)
        {
            StringContent RoleStringfy = new StringContent(JsonConvert.SerializeObject(Role), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync("Role/Update", RoleStringfy);

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
        public async Task<DTO.Role> Delete(DTO.Role Role)
        {

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri(serviceSettings.ClientHost + "Role/Delete"),
                Content = new StringContent(JsonConvert.SerializeObject(Role), System.Text.Encoding.UTF8, "application/json")
            };

            HttpResponseMessage Response = await _httpClient.SendAsync(request);
            //HttpResponseMessage Response = await _httpClient.SendAsync(request);
            if (Response.IsSuccessStatusCode)
            {
                string result = await Response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<DTO.Role>(result);
            }
            else
            {
                return null;
            }
        }

    }
}
