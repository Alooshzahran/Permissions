using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace Permission.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult SignIn()
        {
            return Challenge(new AuthenticationProperties
            {
                RedirectUri = "/Home/Index"
            }, "oidc");
            //return View();
        }

        public async Task<IActionResult> SignOut()
        {
            //await HttpContext.SignOutAsync("Cookies", new AuthenticationProperties
            //{
            //    RedirectUri = "/Home/Index",

            //});

            return SignOut(new AuthenticationProperties
            {
                RedirectUri = "/Home/Index",

            }, new[] { "oidc", "Cookies" });


            //return View();
        }
    }
}
