using Connecter.Client;
using Permission.Middlewares;
using Serilog;
using Microsoft.AspNetCore.CookiePolicy;
using Connecter.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the Container.
builder.Services.AddControllersWithViews();


// Add Client to the Container
builder.Services.AddHttpContextAccessor();
builder.Services.Configure<ServiceSettings>(builder.Configuration.GetSection("HttpClient"));
builder.Services.AddHttpClient<IClientContainer, ClientContainer>();


// Add Logger to the Container

IConfigurationRoot configuration = new ConfigurationBuilder()
               .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true).Build();

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration)
    .CreateLogger();

builder.Logging.ClearProviders();
builder.Logging.AddSerilog();

//// Add Identity Server Authentication to the Container
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "Cookies";

})
.AddCookie("Cookies")
.AddOpenIdConnect("oidc", options =>
{
    options.SignInScheme = "Cookies";
    options.Authority = builder.Configuration.GetSection("IdentityServer:Url").Value;
    //options.RequireHttpsMetadata = true;
    options.ClientId = builder.Configuration.GetSection("Authentication:Google:ClientId").Value;
    options.ClientSecret = builder.Configuration.GetSection("Authentication:Google:ClientSecret").Value;
    options.ResponseType = "code";//id_token//code 
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");
    options.UsePkce = false;
    options.SaveTokens = true;
    options.GetClaimsFromUserInfoEndpoint = true;
    options.RequireHttpsMetadata = builder.Configuration.GetSection("IdentityServer").GetValue<bool>("RequireHttpsMetadata");
});
builder.Services.AddSingleton<ClientResource>();
builder.Services.AddSingleton<Dictionary<string, Dictionary<string, string>>>(e =>
{
    var ClientResource = e.GetRequiredService<ClientResource>();
    var Languages = ClientResource.GetLanguageAll().Result;
    var Resources = ClientResource.GetAll().Result;
    Dictionary<string, Dictionary<string, string>> LangCodeValue = new Dictionary<string, Dictionary<string, string>>();
    if (Languages != null && Resources != null)
    {
        foreach (var Lang in Languages)
        {
            Dictionary<string, string> CodeValue = new Dictionary<string, string>();
            foreach (var res in Resources)
            {
                if (res.LanguageID == Lang.ID)
                {
                    CodeValue.Add(res.Code, res.Value);
                }
            }
            LangCodeValue.Add(Lang.ShortName, CodeValue);
            CodeValue = new Dictionary<string, string>();
        }
    }
    return LangCodeValue;
});

builder.Services.AddSingleton<IList<Language>>(e =>
{
    var ClientResource = e.GetRequiredService<ClientResource>();
    var Languages = ClientResource.GetLanguageAll().Result;
    return Languages?.ToList();
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors();
app.UseCookiePolicy(new CookiePolicyOptions
{
    HttpOnly = HttpOnlyPolicy.None,
    MinimumSameSitePolicy = SameSiteMode.None,
    Secure = CookieSecurePolicy.Always
});

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddlewareLogin();
//app.MapControllers();

app.UseEndpoints(endpoints =>
{
    endpoints.MapDefaultControllerRoute()
        .RequireAuthorization();
    endpoints.MapFallbackToController("SignIn", "Login");
});

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
