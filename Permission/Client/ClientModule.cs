using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Connecter.Client.Models;
using System.Net.Http.Headers;
using DTO;
using Repository;

namespace Connecter.Client
{
    public class ClientModule
    {
        private readonly HttpClient _httpClient;
        private readonly ServiceSettings serviceSettings;
        

        public ClientModule(HttpClient httpClient, IOptions<ServiceSettings> serviceSettings, IHttpContextAccessor httpContext)
        {
            httpClient.BaseAddress = new Uri(serviceSettings.Value.ClientHost);
            this._httpClient = httpClient;
            this.serviceSettings = serviceSettings.Value;
            var AccessToken = Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.GetTokenAsync(httpContext.HttpContext, "access_token").Result;
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);        
        }
        public async Task<IEnumerable<DTO.Module>> GetAll()
        {
            HttpResponseMessage Response = await _httpClient.GetAsync("Module/GetAll");
            if (Response.IsSuccessStatusCode)
            {
                List<DTO.Module> UserModule = JsonConvert.DeserializeObject<IEnumerable<DTO.Module>>(Response.Content.ReadAsStringAsync().Result).ToList();
                return UserModule;
            }
            return null;
        }

        public async Task<DTO.Module> GetByID(int ID)
        {
            HttpResponseMessage Response = await _httpClient.GetAsync($"Module/GetByID?ID={ID}");
            if (Response.IsSuccessStatusCode)
            {
                DTO.Module Module = JsonConvert.DeserializeObject<DTO.Module>(Response.Content.ReadAsStringAsync().Result);
                return Module;
            }
            return null;
        }

        public async Task<Response> Create(DTO.Module Module,IFormFile? file)
        {
            if (file != null)
            {
                var Extension = Path.GetExtension(file.FileName);
                string FileName = Guid.NewGuid().ToString();
                string FileName1 = Path.Combine(FileName + Extension);
                Module.File = FileName1;
                using var content = new MultipartFormDataContent();
                using var streamContent = new StreamContent(file.OpenReadStream())
                {
                    Headers = {
                    ContentDisposition = new ContentDispositionHeaderValue("form-data") { Name = "file", FileName = FileName1 }
                }
                };
                content.Add(streamContent, "file");
                HttpResponseMessage Response1 = await _httpClient.PostAsync("Module/SavePhoto", content);
                
            }
            StringContent ModuleStringfy = new StringContent(JsonConvert.SerializeObject(Module), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync("Module/Create", ModuleStringfy);

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


        public async Task<Response> Update(DTO.Module Module ,IFormFile? file)
        {
            if(file != null)
            {
                var Extension = Path.GetExtension(file.FileName);
                string FileName = Guid.NewGuid().ToString();
                string FileName1 = Path.Combine(FileName + Extension);
                Module.File = FileName1;
                using var content = new MultipartFormDataContent();
                using var streamContent = new StreamContent(file.OpenReadStream())
                {
                    Headers = {
                        ContentDisposition = new ContentDispositionHeaderValue("form-data") { Name = "file", FileName = FileName1 }
                    }
                };
                content.Add(streamContent, "file");
                HttpResponseMessage Response1 = await _httpClient.PostAsync("Module/SavePhoto", content);
            }
            StringContent ModuleStringfy = new StringContent(JsonConvert.SerializeObject(Module), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync("Module/Update", ModuleStringfy);

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
        public async Task<DTO.Module> Delete(DTO.Module Module)
        {

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri(serviceSettings.ClientHost + "Module/Delete"),
                Content = new StringContent(JsonConvert.SerializeObject(Module), System.Text.Encoding.UTF8, "application/json")
            };

            HttpResponseMessage Response = await _httpClient.SendAsync(request);
            //HttpResponseMessage Response = await _httpClient.SendAsync(request);
            if (Response.IsSuccessStatusCode)
            {
                string result = await Response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<DTO.Module>(result);
            }
            else
            {
                return null;
            }
        }
    }
}
