using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Permission.Models;
using System.Diagnostics;
using Connecter.Models;

namespace Permission.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly IList<Language> _Languages;
        private readonly IHttpContextAccessor HttpContextAccessor;

        public HomeController(ILogger<HomeController> logger, IList<Language> languages, IHttpContextAccessor httpContextAccessor)
        {
            _logger = logger;
            _Languages = languages;
            HttpContextAccessor = httpContextAccessor;
            HttpContextAccessor.HttpContext.Request.Cookies.TryGetValue("Language", out string Language);
            if (string.IsNullOrEmpty(Language))
            {
                httpContextAccessor.HttpContext.Response.Cookies.Append("Language", _Languages.FirstOrDefault(e => e.IsDefault).ShortName);
            }
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> Localization(string culture)
        {
            Response.Cookies.Delete("Language");
            await Task.Run(() =>
            {
                Response.Cookies.Append("Language", culture);
            });
            return RedirectToAction(nameof(Index));
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}