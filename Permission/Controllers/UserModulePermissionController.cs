using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json.Linq;
using Connecter.Client;
using Shared;
using Connecter.Models;

namespace Permission.Controllers
{
    public class UserModulePermissionController : Controller
    {
        private readonly IClientContainer _client;
        private readonly Dictionary<string, string> Resource;
        private readonly IHttpContextAccessor HttpContextAccessor;
        public UserModulePermissionController(IClientContainer client, IHttpContextAccessor httpContextAccessor)
        {
            _client = client;
            HttpContextAccessor = httpContextAccessor;
            HttpContextAccessor.HttpContext.Request.Cookies.TryGetValue("Language", out string Language);
            _client.ResourcesDic.TryGetValue(Language, out Resource);
        }

        public async Task<IActionResult> Index()
        {
            this.ModelTitle(-1, "Permission-UserModulePermissionModel", Resource);
            IEnumerable<DTO.UserModulePermission> UserModulePermissions = await _client.UserModulePermission.GetAll();
            return View(UserModulePermissions);
        }

        public async Task<IActionResult> AddEdit(int ID)
        {
            this.ModelTitle(ID, "UserModulePermissionID", Resource);
            var Modules= await _client.Module.GetAll();
            ViewBag.Modules=new SelectList(Modules,"ID","Name");

            var Users = await _client.User.GetAll();
            ViewBag.Users = new SelectList(Users, "ID", "Name");

            var Roles = await _client.Role.GetAll();
            ViewBag.Roles = new SelectList(Roles, "ID", "Name");

            if (ID == 0)
            {
                
                var UserModulePermission = new DTO.UserModulePermission();
                return View(UserModulePermission);
            }
            else
            {
                var UserModulePermission = await _client.UserModulePermission.GetByID(ID);
                return View(UserModulePermission);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Save(DTO.UserModulePermission UserModulePermission)
        {
            this.ModelTitle(UserModulePermission.ID, "UserModulePermissionID", Resource);

            Response response;
            if (UserModulePermission.ID == 0)
            {
                response = await _client.UserModulePermission.Create(UserModulePermission);

            }
            else
            {
                response = await _client.UserModulePermission.Update(UserModulePermission);

            }
            if (response.IsSuccess)
            {
                return RedirectToAction("Index");
            }
            else
            {
                var Modules = await _client.Module.GetAll();
                ViewBag.Modules = new SelectList(Modules, "ID", "Name");

                var Users = await _client.User.GetAll();
                ViewBag.Users = new SelectList(Users, "ID", "Name");

                var Roles = await _client.Role.GetAll();
                ViewBag.Roles = new SelectList(Roles, "ID", "Name");
                response.Result.SetErrors(ModelState, Resource);
                return View("AddEdit", UserModulePermission);
            }
        }
        public async Task<ActionResult> Delete(int ID)
        {
            DTO.UserModulePermission UserModulePermission = new DTO.UserModulePermission
            {
                ID = ID,
                //DeleteUserID = 1,
                //DeleteDate = DateTime.UtcNow,
                IsDeleted = true
            };
            var Forcast = await _client.UserModulePermission.Delete(UserModulePermission);

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
