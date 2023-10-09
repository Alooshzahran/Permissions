using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using DTO;
using Microsoft.AspNetCore.Http;
using Connecter.Models;

namespace Connecter.Client
{
    public class ClientModule : Client<Module> , IClientModule
    {
        public ClientModule(HttpClient httpClient, IOptions<ServiceSettings> serviceSettings, IHttpContextAccessor httpContext) : base(httpClient, serviceSettings, httpContext)
        {  
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
                HttpResponseMessage Response1 = await _httpClient.PostAsync($"{_ControllerName}/SavePhoto", content);
                
            }
            StringContent ModuleStringfy = new StringContent(JsonConvert.SerializeObject(Module), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync($"{_ControllerName}/Create", ModuleStringfy);

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
                var Result = await Response.Content.ReadAsStringAsync();

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
                HttpResponseMessage Response1 = await _httpClient.PostAsync($"{_ControllerName}/SavePhoto", content);
            }
            StringContent ModuleStringfy = new StringContent(JsonConvert.SerializeObject(Module), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await _httpClient.PostAsync($"{_ControllerName}/Update", ModuleStringfy);

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
       
    }
}
