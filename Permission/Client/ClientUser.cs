using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Connecter.Client.Models;
using System.Net.Http.Headers;

namespace Connecter.Client
{
    public class ClientUser
    {
        private readonly HttpClient _httpClient;
        private readonly ServiceSettings serviceSettings;
        
        public ClientUser(HttpClient httpClient, IOptions<ServiceSettings> serviceSettings, IHttpContextAccessor httpContext)
        {
            httpClient.BaseAddress = new Uri(serviceSettings.Value.ClientHost);
            this._httpClient = httpClient;
            this.serviceSettings = serviceSettings.Value;
            var AccessToken = Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.GetTokenAsync(httpContext.HttpContext, "access_token").Result;
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);
        }
        public async Task<IEnumerable<DTO.User>> GetAll()
        {
            HttpResponseMessage Response = await _httpClient.GetAsync("User/GetAll");
            if (Response.IsSuccessStatusCode)
            {
                List<DTO.User> Users = JsonConvert.DeserializeObject<IEnumerable<DTO.User>>(Response.Content.ReadAsStringAsync().Result).ToList();
                return Users;
            }
            return null;
        }

        public async Task<DTO.User> GetByID(int ID)
        {
            HttpResponseMessage Response = await _httpClient.GetAsync($"User/GetByID?ID={ID}");
            if (Response.IsSuccessStatusCode)
            {
                DTO.User User = JsonConvert.DeserializeObject<DTO.User>(Response.Content.ReadAsStringAsync().Result);
                return User;
            }
            return null;
        }
        public async Task<Response> Create(DTO.User User)
        {
            StringContent UserStringfy = new StringContent(JsonConvert.SerializeObject(User), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync("User/Create", UserStringfy);

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


        public async Task<Response> Update(DTO.User User)
        {
            StringContent UserStringfy = new StringContent(JsonConvert.SerializeObject(User), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync("User/Update", UserStringfy);

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
        public async Task<DTO.User> Delete(DTO.User User)
        {

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri(serviceSettings.ClientHost + "User/Delete"),
                Content = new StringContent(JsonConvert.SerializeObject(User), System.Text.Encoding.UTF8, "application/json")
            };

            HttpResponseMessage Response = await _httpClient.SendAsync(request);
            //HttpResponseMessage Response = await _httpClient.SendAsync(request);
            if (Response.IsSuccessStatusCode)
            {
                string result = await Response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<DTO.User>(result);
            }
            else
            {
                return null;
            }
        }
    }
}
