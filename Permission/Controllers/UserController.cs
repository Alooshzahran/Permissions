using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Connecter.Client;
using Shared;
using Connecter.Models;

namespace Permission.Controllers
{
    public class UserController : Controller
    {
        private readonly IClientContainer _client;
        private readonly Dictionary<string, string> Resource;
        private readonly IHttpContextAccessor HttpContextAccessor;

        public UserController(IClientContainer client, IHttpContextAccessor httpContextAccessor)
        {
            _client = client;
            HttpContextAccessor = httpContextAccessor;
            HttpContextAccessor.HttpContext.Request.Cookies.TryGetValue("Language", out string Language);
            _client.ResourcesDic.TryGetValue(Language, out Resource);
        }

        public async Task<IActionResult> Index()
        {
            this.ModelTitle(-1, "Administrator-UserModel", Resource);
            IEnumerable<DTO.User> Users = await _client.User.GetAll();
            return View(Users);
        }

        public async Task<IActionResult> AddEdit(int ID)
        {
            this.ModelTitle(ID, "UserID", Resource);
            if (ID == 0)
            {

                var User = new DTO.User();
                return View(User);
            }
            else
            {
                var User = await _client.User.GetByID(ID);
                return View(User);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Save(DTO.User User)
        {
            this.ModelTitle(User.ID, "UserID", Resource);

            Response response;
            if (User.ID == 0)
            {
                response = await _client.User.Create(User);

            }
            else
            {
                response = await _client.User.Update(User);

            }
            if (response.IsSuccess)
            {
                return RedirectToAction("Index");
            }
            else
            {

                response.Result.SetErrors(ModelState, Resource);
                return View("AddEdit", User);
            }
        }

        //[HttpDelete]
        public async Task<ActionResult> Delete(int ID)
        {
            DTO.User User = new DTO.User
            {
                ID = ID,
                //DeleteUserID = 1,
                //DeleteDate = DateTime.UtcNow,
                IsDeleted = true,
            };
            var Forcast = await _client.User.Delete(User);

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
            IEnumerable<DTO.User> Users = await _client.User.GetAll();
            return Json(Users);
        }
    }
}
