using AutoMapper;
using DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;
using System.Linq;
using System.Reflection;

namespace Permission_Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ModuleController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
       // private readonly Permission_Api.Helper.Activator _activator;
        public ModuleController(IUnitOfWork unitOfWork, IMapper mapper, IWebHostEnvironment webHostEnvironment)//,Permission_Api.Helper.Activator activator)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _webHostEnvironment = webHostEnvironment;
            //_activator = activator;
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAll()
        {
           // _activator.Activate();

            var EntityModule = _unitOfWork.Module.GetAll();
            var DTOModule = _mapper.Map<IEnumerable<DTO.Module>>(EntityModule.ToList());
            return Ok(DTOModule);
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetByID(int ID)
        {
            var EntityModule = _unitOfWork.Module.GetByID(ID);
            var DTOModule = _mapper.Map<DTO.Module>(EntityModule);
            return Ok(DTOModule);
        }
        
        [Route("[action]")]
        [HttpPost]
        public IActionResult Create(DTO.Module Module)
        {
            var EntityModule = _mapper.Map<Entity.Module>(Module);
            EntityModule.ModuleProperties = new List<Entity.ModuleProperties>();
            _unitOfWork.Module.Create(EntityModule);
            //_unitOfWork.Complete();

            /***************************************/
            List<string> MethodsNames = new List<string> { "Index", "AddEdit", "Get", "Delete" };
            var path1 = Path.Combine(_webHostEnvironment.WebRootPath, "Files", Module.File);
            Assembly assembly = Assembly.LoadFrom(path1);


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
                    var TempModuleProperties = new DTO.ModuleProperties
                    {
                        ControllerName = ControllerName,
                        ActionName = ActionName,
                        //ModuleID = EntityModule.ID,
                        MethodType = MethodType,
                    };

                    var EntityTempModuleProperties = _mapper.Map<Entity.ModuleProperties>(TempModuleProperties);

                    EntityModule.ModuleProperties.Add(EntityTempModuleProperties);

                    //_unitOfWork.ModuleProperties.Create(EntityTempModuleProperties);
                    //_unitOfWork.Complete();
                    /********************************************************/

                    Console.WriteLine($"Controller : {ControllerName} => Action : {ActionName} => MethodType : {MethodType}");

                }
                Console.WriteLine($"--------------------------------------------------------------------------");
                //var q = (System.Reflection.TypeInfo)Controller.DeclaredMethods;
                //ActionList.AddRange((System.Reflection.TypeInfo)Controller).DeclaredMethods)

                //ActionList.Add(Controller.DeclaringMethod.Name);
            });
            var x = EntityModule;
            _unitOfWork.Complete();

            /**************************************/


            Module.ID = EntityModule.ID;
            return Ok(Module);
        }


        [Route("[action]")]
        [HttpPost]
        public IActionResult Update(DTO.Module Module)
        {

            var OldEntityModule = _unitOfWork.Module.GetByID(Module.ID);

            //var EntityModule = _mapper.Map<Entity.Module>(Module);
            //_unitOfWork.Module.Update(EntityModule);
            //_unitOfWork.Complete();
            //return Ok(Module);


            if (Module.File == null)
            {
                OldEntityModule.Name= Module.Name;
                OldEntityModule.Url = Module.Url;
            }
            else
            {
                OldEntityModule.Name = Module.Name;
                OldEntityModule.Url = Module.Url;

                List<string> MethodsNames = new List<string> { "Index", "AddEdit", "Get", "Delete" };
                var path1 = Path.Combine(_webHostEnvironment.WebRootPath, "Files", Module.File);
                Assembly assembly = Assembly.LoadFrom(path1);
                var ControllerList = assembly.ExportedTypes
                    .Where(type => type.BaseType == typeof(Controller)).ToList();
                var qq = ControllerList[0].GetMethods().Where(e => MethodsNames.Contains(e.Name));
                Console.WriteLine($"--------------------------------------------------------------------------");
                ControllerList.ForEach(Controller =>
                {
                    var methods = ((System.Reflection.TypeInfo)Controller).DeclaredMethods;
                    foreach (var method in methods)
                    {
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

                        Entity.ModuleProperties TempModuleProperties = new Entity.ModuleProperties
                        {

                            ControllerName = ControllerName,
                            ActionName = ActionName,
                            MethodType = MethodType,


                        };

                        //var OldModuleProperties = OldEntityModule.ModuleProperties.ToList();

                        var IsExistModuleProperty = OldEntityModule.ModuleProperties.Where(e => e.ControllerName == TempModuleProperties.ControllerName 
                                                                                             && e.ActionName == TempModuleProperties.ActionName 
                                                                                             && e.MethodType == TempModuleProperties.MethodType)
                                                                                            .FirstOrDefault() != null;

                        if (IsExistModuleProperty)
                        {
                            continue;
                        }
                        else
                        {
                            OldEntityModule.ModuleProperties.Add(TempModuleProperties);
                        }

                        //if (!OldEntityModule.ModuleProperties.Contains(TempModuleProperties))
                        //{
                        //    OldEntityModule.ModuleProperties.Add(TempModuleProperties);
                        //}
                    }
                });
            }
            _unitOfWork.Complete();
            return Ok(Module);


        }

            /**********************************************************/
        //    if (Module.File != null) {
        //        List<string> MethodsNames = new List<string> { "Index", "AddEdit", "Get", "Delete" };
        //        var path1 = Path.Combine(_webHostEnvironment.WebRootPath, "Files", Module.File);
        //        Assembly assembly = Assembly.LoadFrom(path1);
        //        var ControllerList = assembly.ExportedTypes
        //            .Where(type => type.BaseType == typeof(Controller)).ToList();
        //        var qq = ControllerList[0].GetMethods().Where(e => MethodsNames.Contains(e.Name));
        //        Console.WriteLine($"--------------------------------------------------------------------------");
        //        ControllerList.ForEach(Controller =>
        //        {
        //            var methods = ((System.Reflection.TypeInfo)Controller).DeclaredMethods;
        //            foreach (var method in methods)
        //            {
        //                var ControllerName = Controller.Name;
        //                var ActionName = method.Name;




        //                var isPost = method.GetCustomAttributes(typeof(HttpPostAttribute), true).Length > 0;
        //                var isGet = method.GetCustomAttributes(typeof(HttpGetAttribute), true).Length > 0;
        //                var isPut = method.GetCustomAttributes(typeof(HttpPutAttribute), true).Length > 0;
        //                var isDelete = method.GetCustomAttributes(typeof(HttpDeleteAttribute), true).Length > 0;
        //                var isPatch = method.GetCustomAttributes(typeof(HttpPatchAttribute), true).Length > 0;


        //                string MethodType = string.Empty;

        //                if (isPost)
        //                    MethodType = "POST";
        //                else if (isGet)
        //                    MethodType = "GET";
        //                else if (isPut)
        //                    MethodType = "PUT";
        //                else if (isDelete)
        //                    MethodType = "DELETE";
        //                else if (isPatch)
        //                    MethodType = "PATCH";

        //                if (string.IsNullOrEmpty(MethodType))
        //                    MethodType = "GET";

        //                Entity.ModuleProperties  TempModuleProperties = new Entity.ModuleProperties
        //                {

        //                    ControllerName = ControllerName,
        //                    ActionName = ActionName,
        //                    MethodType = MethodType,


        //                };

        //                var OldModuleProperties= OldEntityModule.ModuleProperties.ToList();
        //                if (!OldModuleProperties.Contains(TempModuleProperties)){
        //                    OldEntityModule.ModuleProperties.Add(TempModuleProperties);
        //                }
        //            }
        //        });
        //    }
        //    else
        //    {
        //        Module.File = OldEntityModule.File;
        //    }

        //    var EntityModule = _mapper.Map<Entity.Module>(Module);
        //    EntityModule.ModuleProperties = OldEntityModule.ModuleProperties;

        //    //_unitOfWork.Module.Update(EntityModule);
        //    _unitOfWork.Complete();
        //    return Ok(Module);


        //}

        [Route("[action]")]
        [HttpDelete]
        public IActionResult Delete(DTO.Module Module)
        {
            var EntityModule = _unitOfWork.Module.GetByID(Module.ID);
            if (EntityModule != null)
            {
                EntityModule.IsDeleted = true;
                EntityModule.DeleteDate = DateTime.Now;
                EntityModule.DeleteUserID = Module.DeleteUserID;

                _unitOfWork.Complete();
                Module = _mapper.Map<DTO.Module>(EntityModule);
                return Ok(Module);
            }
            else
            {
                return NotFound();
            }

            //return Ok(Role);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SavePhoto([FromForm] IFormFile file)
        {
            if (file == null || file.Length <= 0)
            {
                return BadRequest("No UploadFile received.");
            }
            else
            {
                string folderPath = Path.Combine(_webHostEnvironment.WebRootPath, "Files");
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }
                var filePath = Path.Combine(folderPath, file.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                    fileStream.Flush();
                }
                //var Activator = new Permission_Api.Helper.Activator(_unitOfWork, _webHostEnvironment);
                //Activator.Activate(UploadFile.FileName);
                return Ok("File and data received and processed successfully.");
            }
        }

        private Entity.Module CheckModuleProperties(Entity.Module NewModule)
        {
            _unitOfWork.Module.GetByID(1);
            return new Entity.Module();
        }

    }
}
