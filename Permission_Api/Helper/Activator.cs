using Entity;
using Microsoft.AspNetCore.Mvc;
using Repository;
using System;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using System.Security.Cryptography.Xml;

namespace Permission_Api.Helper
{
    public class Activator
    {
        private readonly DBContext _dbContext;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _environment;


        public Activator(IUnitOfWork unitOfWork ,IWebHostEnvironment environment)
        {
            _unitOfWork = unitOfWork;
            _environment = environment;
        }

        //public Activator()
        //{
        //    ;
        //}
        public void Activate(string FileName)
        {

            List<string> MethodsNames = new List<string> { "Index", "AddEdit", "Get", "Delete" };
            var path1 = Path.Combine(_environment.WebRootPath, "Files", FileName);
            Assembly assembly = Assembly.LoadFrom(path1);

            if(assembly != null)
            {

                Entity.Module NewModule = new Entity.Module
                {
                    Name = assembly.GetName().Name,
                    Url = null,
                    File = assembly.Location,
                };

                /*************  Save Module  *************/


                //var AllModules = _unitOfWork.Module.GetAll().ToList();
                //var IsExist = AllModules.Find(e => e.Name == NewModule.Name);
                var ExistModule= _unitOfWork.Module.Find(e=>e.Name == NewModule.Name).FirstOrDefault();

                if(ExistModule == null) 
                {
                    _unitOfWork.Module.Create(NewModule);
                    _unitOfWork.Complete();
                }
                else
                {
                    NewModule.ID = ExistModule.ID;
                }
                /**************************/


                Type[] types = assembly.ExportedTypes.Where(e => e.Name.Contains("Controller")).ToArray();

                var references = assembly.GetReferencedAssemblies();
                var module = assembly.GetModule("CRMUI.Controllers.LicenseTypeController");
                //var typeName = "";
                //Type type = assembly.GetType(assembly);

                //var activate = System.Activator.CreateInstance(typename
                //    , BindingFlags.CreateInstance 
                //    | BindingFlags.Public 
                //    | BindingFlags.Instance 
                //    | BindingFlags.OptionalParamBinding
                //    , null
                //    , new Object[] {Type.Missing}
                //    , null);

                //System.Activator activator = new Activator();
                //object instance = activator.CreateInstance(type);


                //var controlleractionlist = assembly.GetTypes()
                //.Where(type => typeof(Controller).IsAssignableFrom(type))
                //.SelectMany(type => type.GetMethods(BindingFlags.Instance | BindingFlags.DeclaredOnly | BindingFlags.Public))
                //.Where(m => !m.GetCustomAttributes(typeof(System.Runtime.CompilerServices.CompilerGeneratedAttribute), true).Any())
                //.Select(x => new {
                //    Controller = x.DeclaringType.Name,
                //    Action = x.Name,
                //    ReturnType = x.ReturnType.Name,
                //    Attributes = String.Join(",", x.GetCustomAttributes().Select(a => a.GetType().Name.Replace("Attribute", "")))
                //})
                //.OrderBy(x => x.Controller).ThenBy(x => x.Action).ToList();

                var ControllerList = assembly.ExportedTypes
                .Where(type => type.BaseType == typeof(Controller)).ToList();

                var ActionList = new List<string>();

                var qq = ControllerList[0].GetMethods().Where(e => MethodsNames.Contains(e.Name));
                Console.WriteLine($"--------------------------------------------------------------------------");
                ControllerList.ForEach(Controller =>
                {
                    var methods = ((System.Reflection.TypeInfo)Controller).DeclaredMethods;

                    //methodInfo.GetCustomAttributes(typeof(HttpPostAttribute), true);

                    foreach (var method in methods)
                    {


                        //if (Controller.Name.ToLower().Contains("home"))
                        //    ;
                        var ControllerName = Controller.Name;
                        var ActionName = method.Name;

                        var isPost = method.GetCustomAttributes(typeof(HttpPostAttribute), true).Length > 0;
                        var isGet = method.GetCustomAttributes(typeof(HttpGetAttribute), true).Length > 0;
                        var isPut = method.GetCustomAttributes(typeof(HttpPutAttribute), true).Length > 0;
                        var isDelete = method.GetCustomAttributes(typeof(HttpDeleteAttribute), true).Length > 0;
                        var isPatch = method.GetCustomAttributes(typeof(HttpPatchAttribute), true).Length > 0;

                        string MethodType = string.Empty;

                        if (isPost)
                            MethodType = "POST";
                        else if (isGet)
                            MethodType = "GET";
                        else if (isPut)
                            MethodType = "PUT";
                        else if (isDelete)
                            MethodType = "DELETE";
                        else if (isPatch)
                            MethodType = "PATCH";

                        if (string.IsNullOrEmpty(MethodType))
                            MethodType = "GET";

                        /***************************  Save Module Properties  *****************************/
                        var TempModuleProperties = new ModuleProperties
                        {
                            ControllerName = ControllerName,
                            ActionName = ActionName,
                            ModuleID = NewModule.ID,
                            MethodType = MethodType,
                        };

                        _unitOfWork.ModuleProperties.Create(TempModuleProperties);
                        _unitOfWork.Complete();
                        /********************************************************/

                        Console.WriteLine($"Controller : {ControllerName} => Action : {ActionName} => MethodType : {MethodType}");

                    }
                    Console.WriteLine($"--------------------------------------------------------------------------");
                    //var q = (System.Reflection.TypeInfo)Controller.DeclaredMethods;
                    //ActionList.AddRange((System.Reflection.TypeInfo)Controller).DeclaredMethods)

                    //ActionList.Add(Controller.DeclaringMethod.Name);
                });
                //assembly.ExportedTypes
                //    .Where(type=>type.BaseType == typeof(Action)).ToList();


                //CRM_Assembly.GetTypes()
                //    .Where(type => typeof(Controller).IsAssignableFrom(type))
                //    .SelectMany(type => type.GetMethods())
                //    .Where(method => method.IsPublic && !method.IsDefined(typeof(NonActionAttribute)));
            }
            else
            {
                Console.WriteLine("No Assembly");
            }
        }

    }
}
