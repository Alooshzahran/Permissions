using Permission_Api.Client;
using Repository;
using Shared;

namespace Permission_Api.Middleware
{
    public class MiddlewareUserInfo
    {
        private readonly RequestDelegate _next;

        public MiddlewareUserInfo(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext, IUnitOfWork UnitOfWork, IConfiguration config, ClientIdentityServer IdentityServer)
        {
            var AccessToken = httpContext.Request.Headers["Authorization"].FirstOrDefault();
            if (AccessToken != null)
            {
                Entity.User? User = null;
                var Email = await IdentityServer.GetUserEmail(AccessToken);

                AccessToken = AccessToken.Replace("Bearer ", "");
                var SID = AccessToken.GetSID();
                var Payload = AccessToken.GetPayload();



                if (UnitOfWork.User.Find(e => e.Email.ToLower() == Email.ToLower()).Count() == 0)
                {
                    UnitOfWork.User.Create(
                        new Entity.User
                        {
                            Email = Email,
                            Name = Payload["name"].ToString(),
                            CreationDate = DateTime.UtcNow,
                            IsActive = true,
                            IsDeleted = false
                        }
                    );

                    UnitOfWork.Complete();

                }
                User = UnitOfWork.User.Find(e => e.Email.ToLower() == Email.ToLower()).FirstOrDefault();


                if (User != null)
                {
                    httpContext.Request.Headers.Add("UserID", User.ID.ToString());
                    httpContext.Request.Headers.Add("SID", SID);
                    await httpContext.ModifyBody(User.ID);
                }


            }
            await _next(httpContext);

        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class MiddlewareUserInfoExtensions
    {
        public static IApplicationBuilder UseMiddlewareUserInfo(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<MiddlewareUserInfo>();
        }
    }
}
