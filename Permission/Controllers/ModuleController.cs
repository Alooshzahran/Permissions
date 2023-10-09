using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Connecter.Client;
using Shared;
using Connecter.Models;

namespace Permission.Controllers
{
    public class ModuleController : Controller
    {
        private readonly IClientContainer _client;
        private readonly Dictionary<string, string> Resource;
        private readonly IHttpContextAccessor HttpContextAccessor;

        public ModuleController(IClientContainer client, IHttpContextAccessor httpContextAccessor)
        {
            _client = client;
            HttpContextAccessor = httpContextAccessor;
            HttpContextAccessor.HttpContext.Request.Cookies.TryGetValue("Language", out string Language);
            _client.ResourcesDic.TryGetValue(Language, out Resource);
        }
        public async Task<IActionResult> Index()
        {
            this.ModelTitle(-1, "Administrator-ModuleModel", Resource);
            IEnumerable<DTO.Module> Module = await _client.Module.GetAll();
            return View(Module);
        }

        public async Task<IActionResult> AddEdit(int ID)
        {
            this.ModelTitle(ID, "ModuleID", Resource);
            if (ID == 0)
            {
                var Module = new DTO.Module();
                return View(Module);
            }
            else
            {
                var Module = await _client.Module.GetByID(ID);
                return View(Module);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Save(DTO.Module Module, IFormFile? UploadFile)
        {
            this.ModelTitle(Module.ID, "ModuleID", Resource);

            Response response;
            if (Module.ID == 0)
            {
                response = await _client.Module.Create(Module: Module, UploadFile);

            }
            else
            {
                response = await _client.Module.Update(Module: Module, UploadFile);

            }
            if (response.IsSuccess)
            {
                return RedirectToAction("Index");
            }
            else
            {

                response.Result.SetErrors(ModelState, Resource);
                return View("AddEdit", Module);
            }
        }

        //[HttpDelete]
        public async Task<ActionResult> Delete(int ID)
        {
            DTO.Module Module = new DTO.Module
            {
                ID = ID,
                //DeleteUserID = 1,
                //DeleteDate = DateTime.UtcNow,
                IsDeleted = true,
            };
            var Forcast = await _client.Module.Delete(Module);

            if (Forcast != null)
            {
                return Json(Forcast);
            }
            else
            {

            }
            return null;
        }

        public async Task<JsonResult> GetAll()
        {
            IEnumerable<DTO.Module> Module = await _client.Module.GetAll();
            return Json(Module);
        }
    }
}
