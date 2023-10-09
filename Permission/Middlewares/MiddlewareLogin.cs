namespace Permission.Middlewares
{
    public class MiddlewareLogin
    {
        private readonly RequestDelegate _next;

        public MiddlewareLogin(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {

            await _next(httpContext);

            var responnse = httpContext.Response.StatusCode;
            if (httpContext.Request.RouteValues.ContainsKey("Controller"))
            {
                string Controller = httpContext.Request.RouteValues["Controller"].ToString();
                if (Controller.ToLower() != "login")
                    if (!httpContext.User.Identity.IsAuthenticated)
                        httpContext.Response.Redirect("/Login/SignIn");
            }

        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class MiddlewareLoginExtensions
    {
        public static IApplicationBuilder UseMiddlewareLogin(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<MiddlewareLogin>();
        }
    }
}
