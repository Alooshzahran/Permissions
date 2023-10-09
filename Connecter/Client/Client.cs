using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Connecter.Models;

namespace Connecter.Client
{
    public class Client<T> : IClient<T> where T : Base
    {
        protected readonly HttpClient _httpClient;
        protected readonly ServiceSettings serviceSettings;
        public readonly string _ControllerName;
        public Client(HttpClient httpClient, IOptions<ServiceSettings> serviceSettings, IHttpContextAccessor httpContext)
        {
            httpClient.BaseAddress = new Uri(serviceSettings.Value.ClientHost);
            this._httpClient = httpClient;
            this.serviceSettings = serviceSettings.Value;
            var AccessToken = Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.GetTokenAsync(httpContext.HttpContext, "access_token").Result;
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);
            _ControllerName = typeof(T).Name;
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            HttpResponseMessage Response = await _httpClient.GetAsync($"{_ControllerName}/GetAll");
            if (Response.IsSuccessStatusCode)
            {
                List<T> ObjList = JsonConvert.DeserializeObject<IEnumerable<T>>(Response.Content.ReadAsStringAsync().Result).ToList();
                return ObjList;
            }
            return null;
        }

        public async Task<T> GetByID(int ID)
        {
            HttpResponseMessage Response = await _httpClient.GetAsync($"{_ControllerName}/GetByID?ID={ID}");
            if (Response.IsSuccessStatusCode)
            {
                T Obj = JsonConvert.DeserializeObject<T>(Response.Content.ReadAsStringAsync().Result);
                return Obj;
            }
            return null;
        }

        public async Task<Response> Create(T Obj)
        {
            StringContent RoleStringfy = new StringContent(JsonConvert.SerializeObject(Obj), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync($"{_ControllerName}/Create", RoleStringfy);

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


        public async Task<Response> Update(T Obj)
        {
            StringContent RoleStringfy = new StringContent(JsonConvert.SerializeObject(Obj), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync($"{_ControllerName}/Update", RoleStringfy);

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

        public async Task<T> Delete(T Obj)
        {

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri(serviceSettings.ClientHost + $"{_ControllerName}/Delete"),
                Content = new StringContent(JsonConvert.SerializeObject(Obj), System.Text.Encoding.UTF8, "application/json")
            };

            HttpResponseMessage Response = await _httpClient.SendAsync(request);
            //HttpResponseMessage Response = await _httpClient.SendAsync(request);
            if (Response.IsSuccessStatusCode)
            {
                string result = await Response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(result);
            }
            else
            {
                return null;
            }
        }
    }
}
