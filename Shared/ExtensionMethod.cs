using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;
//using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
//using NuGet.Packaging;
using Repository;
using System.Collections;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Shared
{
    public static class ExtensionMethod
    {
        public static string GetClaimValue(this List<Claim> Claims, string Type)
        {
            if (Claims.Count == 0)      
                return null;
            else
            {
                if (Claims.Find(e => e.Type.ToLower().EndsWith(Type.ToLower())) != null)
                    return Claims.Find(e => e.Type.ToLower().EndsWith(Type.ToLower())).Value;
                if (Claims.Find(e => e.Type == Type) == null)
                    return null;
                else
                    return Claims.Find(e => e.Type == Type).Value;
            }

        }

        public static List<Claim> GetClaims(this System.Security.Principal.IIdentity Identity)
        {
            var newIdentity = Identity as ClaimsIdentity;
            return (Identity as ClaimsIdentity).Claims as List<Claim>;
        }


        public static string GetSID(this string JWTToken)
        {
            var jwt = JWTToken;//.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwt);
            return token.Payload["sid"].ToString();
            //return token.ToString();
        }

        public static JwtPayload GetPayload(this string JWTToken)
        {
            var jwt = JWTToken;//.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwt);
            return token.Payload;
            //return token.ToString();
        }

        static List<string> Add = new List<string> { "add", "insert", "create" };
        static List<string> Edit = new List<string> { "edit", "update" };
        static List<string> Delete = new List<string> { "delete", "remove" };

        public static async Task<HttpContext> ModifyBody(this HttpContext httpContext, int UserID)
        {
            if (httpContext.Request.RouteValues.Count > 0)
            {
                var Controller = httpContext.Request.RouteValues["Controller"].ToString();
                var Action = httpContext.Request.RouteValues["Action"].ToString();

                if (Add.Any(e => Action.ToLower().Contains(e)))
                {
                    var stream = httpContext.Request.Body; // currently holds the original stream                    
                    var SR = new StreamReader(stream);
                    var originalContent = await SR.ReadToEndAsync();
                    var bodyText = JObject.Parse(originalContent);
                    bodyText.FillObject(new Dictionary<string, object>
                    {
                        { "CreationUserID", UserID },
                        { "CreationDate", DateTime.UtcNow }
                    });
                    var requestContent = new StringContent(JsonConvert.SerializeObject(bodyText), Encoding.UTF8,
                        "application/json");
                    httpContext.Request.Body = await requestContent.ReadAsStreamAsync(); //modified stream
                }

                if (Edit.Any(e => Action.ToLower().Contains(e)))
                {
                    var stream = httpContext.Request.Body; // currently holds the original stream                    
                    var SR = new StreamReader(stream);
                    var originalContent = await SR.ReadToEndAsync();
                    if (originalContent.Length > 0)
                    {
                        var bodyText = JObject.Parse(originalContent);
                        bodyText.FillObject(new Dictionary<string, object>
                    {
                        { "ModifyUserID", UserID },
                        { "ModifyDate", DateTime.UtcNow }
                    });

                        //bodyText["ModifyUserID"] = UserID;// User.ID;
                        //bodyText["ModifyDate"] = DateTime.UtcNow;// User.ID;

                        var requestContent = new StringContent(JsonConvert.SerializeObject(bodyText), Encoding.UTF8,
                            "application/json");
                        httpContext.Request.Body = await requestContent.ReadAsStreamAsync(); //modified stream
                    }
                }

                if (Delete.Any(e => Action.ToLower().Contains(e)))
                {
                    var stream = httpContext.Request.Body; // currently holds the original stream                    
                    var SR = new StreamReader(stream);
                    var originalContent = await SR.ReadToEndAsync();

                    if (!string.IsNullOrEmpty(originalContent))
                    {
                        var bodyText = JObject.Parse(originalContent);
                        bodyText.FillObject(new Dictionary<string, object>
                            {
                                { "DeleteUserID", UserID },
                                { "DeleteDate", DateTime.UtcNow },
                                { "IsDeleted", true }
                            });

                        //bodyText["DeleteUserID"] = UserID;// User.ID;
                        //bodyText["DeleteDate"] = DateTime.UtcNow;// User.ID;
                        //bodyText["IsDeleted"] = true;// User.ID;

                        var requestContent = new StringContent(JsonConvert.SerializeObject(bodyText), Encoding.UTF8,
                            "application/json");
                        httpContext.Request.Body = await requestContent.ReadAsStreamAsync();
                    }//modified stream
                }
            }

            return httpContext;

        }

        public static bool IsLessThanZero(this int value)
        {
            return value < 0;
        }


        public static String sha256_hash(this string value)
        {
            StringBuilder Sb = new StringBuilder();

            using (SHA256 hash = SHA256Managed.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(value));

                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToString();
        }

        public static void FillObject(this JObject JObject, Dictionary<string, object> Values)
        {
            try
            {


                foreach (var Value in Values)
                {
                    List<JProperty> FoundPropertues = JObject.Properties().Where(e => e.Name == Value.Key).ToList();
                    foreach (var FoundProperty in FoundPropertues)
                    {
                        FoundProperty.Value = new JValue(Value.Value);
                    }
                }
                foreach (var Property in JObject.Properties())
                {
                    if (Property.Value != null)
                    {
                        if (Property.Value.Type == JTokenType.Array)
                        {
                            List<JToken> list = Property.Value.ToList() as List<JToken>;
                            foreach (var item in list)
                            {
                                var temp = item as JObject;
                                if (temp != null)
                                    FillObject(temp, Values);
                            }

                        }

                        if (Property.Value.Type == JTokenType.Object)
                        {
                            foreach (var Value in Values)
                            {
                                JObject TempJObject = Property.Value as JObject;
                                List<JProperty> FoundPropertues = TempJObject.Properties().Where(e => e.Name == Value.Key).ToList();
                                foreach (var FoundProperty in FoundPropertues)
                                {
                                    FoundProperty.Value = new JValue(Value.Value);// Value.Value.ToString();
                                }
                            }
                        }
                    }
                }

                //return Properties;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static void FillObject(this List<JProperty> Properties, Dictionary<string, object> Values)
        {
            foreach (var Property in Properties)
            {
                if (Property.Value != null)
                {
                    if (Property.Value.Type == JTokenType.Array)
                    {
                        List<JToken> list = Property.Value.ToList() as List<JToken>;
                        foreach (var item in list)
                        {
                            var temp = item as JObject;
                            FillObject(temp.Properties().ToList(), Values);
                        }

                    }

                    if (Property.Value.Type == JTokenType.Object)
                    {
                        foreach (var Value in Values)
                        {
                            JObject TempJObject = Property.Value as JObject;
                            List<JProperty> FoundPropertues = TempJObject.Properties().Where(e => e.Name == Value.Key).ToList();
                            foreach (var FoundProperty in FoundPropertues)
                            {
                                FoundProperty.Value = new JValue(Value.Value);// Value.Value.ToString();
                            }
                        }
                    }
                }
            }


        }

        public static string WriteAttachment(this DTO.FileInfo FileInfo, string SavedFilePath)
        {
            var fileName = Guid.NewGuid() + FileInfo.FileName.Substring(FileInfo.FileName.IndexOf("."));
            byte[] Bytes = FileInfo.Bytes;
            FileStream fs = new FileStream(SavedFilePath + fileName, FileMode.Create);
            fs.Write(Bytes, 0, Bytes.Length);
            fs.Flush();
            fs.Close();

            return fileName;
        }
        private static TagBuilder BuildOptions(TagBuilder Parent, SelectList items, string OptionLabel)
        {
            if (!string.IsNullOrEmpty(OptionLabel))
            {
                TagBuilder newOption = new TagBuilder("option");
                newOption.InnerHtml.SetContent(OptionLabel);
                Parent.InnerHtml.AppendHtml(newOption);
            }
            foreach (var SelectListItem in items)
            {
                TagBuilder newOption = new TagBuilder("option");
                newOption.Attributes.Add("value", SelectListItem.Value);
                newOption.InnerHtml.SetContent(SelectListItem.Text);


                Parent.InnerHtml.AppendHtml(newOption);
            }
            return Parent;

        }

        public static void SetErrors(this JObject Result, ModelStateDictionary ModelState, Dictionary<string, string> ResourcesDic)
        {
            foreach (var item in Result.Children())
            {
                var x = item as JProperty;
                var name = x.Name;
                var Values = x.Values();
                foreach (var item1 in Values)
                {
                    var JValue = item1 as JValue;
                    var errorCode = JsonConvert.DeserializeObject<Error>(JValue.Value.ToString());
                    var errorValue = ResourcesDic.FirstOrDefault(e => e.Key == errorCode.Code).Value;
                    ModelState.AddModelError(name, errorValue);
                }
            }
        }
        public static void ModelTitle(this Controller controller,int ID ,string MName , Dictionary<string, string> Resource) 
        {
            string ModelName = Resource.FirstOrDefault(e => e.Key == MName).Value;
            string Action = "";
            string LastAction = "";
            if(ID == -1)
            {
                Action = Resource.FirstOrDefault(e => e.Key == "ListAction").Value;
            }
            else
            {
                Action = Resource.FirstOrDefault(e => e.Key == (ID == 0 ? "CreateAction" : "EditAction")).Value;
                LastAction = Resource.FirstOrDefault(e => e.Key == "ListAction").Value;
                MName = MName.Replace("ID", "") + "Model";
                string LastModelName = Resource.FirstOrDefault(e => e.Key.Contains(MName)).Value;
                controller.ViewBag.LastTitle = string.Concat(LastAction, " ", LastModelName);
            }
            controller.ViewBag.Title = String.Concat(Action, " ", ModelName);
            controller.ViewBag.ModelName = ModelName;
        }
    }
}
