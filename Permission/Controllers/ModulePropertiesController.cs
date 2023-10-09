using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json.Linq;
using Connecter.Client;
using Shared;
using Connecter.Models;

namespace Permission.Controllers
{
    public class ModulePropertiesController : Controller
    {
        private readonly IClientContainer _client;
        private readonly Dictionary<string, string> Resource;
        private readonly IHttpContextAccessor HttpContextAccessor;
        public ModulePropertiesController(IClientContainer client, IHttpContextAccessor httpContextAccessor)
        {
            _client = client;
            HttpContextAccessor = httpContextAccessor;
            HttpContextAccessor.HttpContext.Request.Cookies.TryGetValue("Language", out string Language);
            _client.ResourcesDic.TryGetValue(Language, out Resource);
        }
        public async Task<IActionResult> Index()
        {
            this.ModelTitle(-1, "Administrator-ModulePropertiesModel", Resource);
            var ModuleProperties = await _client.ModuleProperties.GetAll();
            return View(ModuleProperties);
        }

        public async Task<IActionResult> AddEdit(int ID)
        {
            this.ModelTitle(ID, "ModulePropertiesID", Resource);
            var Modules = await _client.Module.GetAll();
            ViewBag.Modules = new SelectList(Modules, "ID", "Name");

            var Roles = await _client.Role.GetAll();
            ViewBag.Roles = new MultiSelectList(Roles, "ID", "Name");
            if (ID == 0)
            {
                var ModuleProperties = new DTO.ModuleProperties();

                

                return View(ModuleProperties);
            }
            else
            {
                var ModuleProperties = await _client.ModuleProperties.GetByID(ID);
                return View(ModuleProperties);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Save(DTO.ModuleProperties moduleProperties)
        {
            this.ModelTitle(moduleProperties.ID, "ModulePropertiesID", Resource);

            Response response;
            if (moduleProperties.ID == 0)
            {
                response = await _client.ModuleProperties.Create(moduleProperties);

            }
            else
            {
                response = await _client.ModuleProperties.Update(moduleProperties);

            }
            if (response.IsSuccess)
            {
                return RedirectToAction("Index");
            }
            else
            {
                var Modules = await _client.Module.GetAll();
                ViewBag.Modules = new SelectList(Modules, "ID", "Name");

                var Roles = await _client.Role.GetAll();
                ViewBag.Roles = new MultiSelectList(Roles, "ID", "Name");
                response.Result.SetErrors(ModelState, Resource);
                return View("AddEdit", moduleProperties);
            }
        }

        public async Task<ActionResult> Delete(int ID)
        {
            DTO.ModuleProperties ModuleProperties = new DTO.ModuleProperties
            {
                ID = ID,
                //DeleteUserID = 1,
                //DeleteDate = DateTime.UtcNow,
                IsDeleted = true,
            };
            var Forcast = await _client.ModuleProperties.Delete(ModuleProperties);

            if (Forcast != null)
            {
                return Json(Forcast);
            }
            else
            {

            }
            return null;
        }

    }
}
