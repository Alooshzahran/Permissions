using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json.Linq;
using Connecter.Client;
using Shared;
using Connecter.Models;

namespace Permission.Controllers
{
    public class UserRoleController : Controller
    {
        private readonly IClientContainer _client;
        private readonly Dictionary<string, string> Resource;
        private readonly IHttpContextAccessor HttpContextAccessor;
        public UserRoleController(IClientContainer client, IHttpContextAccessor httpContextAccessor)
        {
            _client = client;
            HttpContextAccessor = httpContextAccessor;
            HttpContextAccessor.HttpContext.Request.Cookies.TryGetValue("Language", out string Language);
            _client.ResourcesDic.TryGetValue(Language, out Resource);
        }

        public async Task<IActionResult> Index()
        {
            this.ModelTitle(-1, "Administrator-UserRolesModel", Resource);
            IEnumerable<DTO.UserRole> UserRole = await _client.UserRole.GetAll();
            return View(UserRole);
        }

        public async Task<IActionResult> AddEdit(int ID)
        {
            this.ModelTitle(ID, "UserRoleID" , Resource);
            var x = await _client.Module.GetAll();
            ViewBag.listModule = new SelectList(x, "ID", "Name");
            var y = await _client.Role.GetAll();
            ViewBag.listRole = new SelectList(y, "ID", "Name");
            var z = await _client.User.GetAll();
            ViewBag.listUser = new SelectList(z, "ID", "Name");
            if (ID == 0)
            {
                var UserRole = new DTO.UserRole();
                return View(UserRole);
            }
            else
            {
                var UserRole = await _client.UserRole.GetByID(ID);
                return View(UserRole);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Save(DTO.UserRole UserRole)
        {
            this.ModelTitle(UserRole.ID, "UserRoleID", Resource);

            Response response;
            if (UserRole.ID == 0)
            {
                response = await _client.UserRole.Create(UserRole);

            }
            else
            {
                response = await _client.UserRole.Update(UserRole);

            }
            if (response.IsSuccess)
            {
                return RedirectToAction("Index");
            }
            else
            {
                var x = await _client.Module.GetAll();
                ViewBag.listModule = new SelectList(x, "ID", "Name");
                var y = await _client.Role.GetAll();
                ViewBag.listRole = new SelectList(y, "ID", "Name");
                var z = await _client.User.GetAll();
                ViewBag.listUser = new SelectList(z, "ID", "Name");
                response.Result.SetErrors(ModelState, Resource);
                return View("AddEdit", UserRole);
            }
        }

        //[HttpDelete]
        public async Task<ActionResult> Delete(int ID)
        {
            DTO.UserRole UserRole = new DTO.UserRole
            {
                ID = ID,
                //DeleteUserID = 1,
                //DeleteDate = DateTime.UtcNow,
                IsDeleted = true,
            };
            var Forcast = await _client.UserRole.Delete(UserRole);

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
