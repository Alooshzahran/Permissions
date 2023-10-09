using DTO;
using Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Connecter.Client;
using Repository;
using Shared;
using Connecter.Models;

namespace Permission.Controllers
{
    public class RoleController : Controller
    {
        private readonly IClientContainer _client;
        private readonly Dictionary<string, string> Resource;
        private readonly IHttpContextAccessor HttpContextAccessor;

        public RoleController(IClientContainer client ,IHttpContextAccessor httpContextAccessor)
        {
            _client = client;
            HttpContextAccessor = httpContextAccessor;
            HttpContextAccessor.HttpContext.Request.Cookies.TryGetValue("Language", out string Language);
            _client.ResourcesDic.TryGetValue(Language, out Resource);
        }

        public async Task<IActionResult> Index()
        {
            this.ModelTitle(-1, "Administrator-RoleModel", Resource);
            IEnumerable<DTO.Role> Roles = await _client.Role.GetAll();
            return View(Roles);
        }

        public async Task<IActionResult> AddEdit(int ID)
        {
            this.ModelTitle(ID, "RoleID", Resource);
            if(ID == 0)
            {
                var Role = new DTO.Role();
                return View(Role);
            }
            else
            {
                var Role = await _client.Role.GetByID(ID);
                return View(Role);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Save(DTO.Role Role)
        {
            this.ModelTitle(Role.ID, "RoleID", Resource);

            Response response;
            if (Role.ID == 0)
            {
                response = await _client.Role.Create(Role);

            }
            else
            {
                response = await _client.Role.Update(Role);

            }
            if (response.IsSuccess)
            {
                return RedirectToAction("Index");
            }
            else
            {

                response.Result.SetErrors(ModelState, Resource);
                return View("AddEdit", Role);
            }
        }
        public async Task<ActionResult> Delete(int ID)
        {
            DTO.Role Role = new DTO.Role
            {
                ID = ID,
                //DeleteUserID = 1,
                //DeleteDate = DateTime.UtcNow,
                IsDeleted = true
            };
            var Forcast = await _client.Role.Delete(Role);

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
            IEnumerable<DTO.Role> Roles = await _client.Role.GetAll();
            return Json(Roles);
        }

    }
}
