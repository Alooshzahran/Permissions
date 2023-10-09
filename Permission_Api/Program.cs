using Repository;
using System.Text.Json.Serialization;
using Serilog;
using Permission_Api.Client;
using Microsoft.EntityFrameworkCore;
using Permission_Api.Middleware;
using FluentValidation.AspNetCore;
using Entity;
using Permission_Api.Helper;

var builder = WebApplication.CreateBuilder(args);

IConfiguration Configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true).Build();

builder.Services.AddDbContext<Entity.DBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyConn")));

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(Configuration)
    .CreateLogger();

//Logging
builder.Logging.AddSerilog();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(x =>
 x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddEndpointsApiExplorer();

//builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IValidatorInterceptor, ValidatorInterceptor>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Add Identity Server Authentication to the Container
builder.Services.AddAuthentication(defaultScheme: "Bearer")
                .AddIdentityServerAuthentication("Bearer", options =>
                {
                    options.Authority = builder.Configuration.GetSection("IdentityServer:Url").Value;
                });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<Entity.DBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyConn")));

builder.Services.AddHttpClient<ClientIdentityServer>();
builder.Services.AddSingleton<HttpContextAccessor>();
builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<DTO.Module>(lifetime: ServiceLifetime.Transient));

//Add Assembly Services to the Container
//var x = new Permission_Api.Helper.Activator();
//x.Activate();
builder.Services.AddScoped(typeof(Permission_Api.Helper.Activator));
//builder.Services.AddScoped<Permission_Api.Helper.Activator>();

//Add Assembly Services to the Container
//var x = new Permission_Api.Helper.Activator();
//x.Activate();


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<Entity.DBContext>();
    dataContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    //app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1.0");
    options.RoutePrefix = "";
});

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddlewareUserInfo();
app.MapControllers();
app.UseStaticFiles();

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
