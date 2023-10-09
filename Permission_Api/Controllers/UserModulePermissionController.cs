using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;
using DTO;
using Entity;
using System.Linq;
using System.Collections.Immutable;

namespace Permission_Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserModulePermissionController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserModulePermissionController(IUnitOfWork unitOfWork,IMapper mapper )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var EntityUserModulePermission = _unitOfWork.UserModulePermission.GetAll();
            var DTOUserModulePermission = _mapper.Map<IEnumerable<DTO.UserModulePermission>>(EntityUserModulePermission);
            return Ok(DTOUserModulePermission);
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetByID(int ID)
        {
            var EntityUserModulePermission = _unitOfWork.UserModulePermission.GetByID(ID);
            var DTOUserModulePermission = _mapper.Map<DTO.UserModulePermission>(EntityUserModulePermission);
            return Ok(DTOUserModulePermission);
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult GetByModuleNameAndUserName(string ModuleName, string UserName)
        {
            var EntityUserModulePermission = _unitOfWork.UserModulePermission.Find(e=>e.Module.Name == ModuleName && e.User.Name == UserName).ToList();
            var DTOUserModulePermission = _mapper.Map<List<DTO.UserModulePermission>>(EntityUserModulePermission);
            return Ok(DTOUserModulePermission);
        }

        [Route("[action]")]
        [HttpGet]
        public bool CheckAuthorization(string ModuleName, string UserEmail, string ControllerName, string ActionName, string Roles)
        {
            var ModuleID = _unitOfWork.Module.Find(e=>e.Name == ModuleName).FirstOrDefault().ID;
            var UserID = _unitOfWork.User.Find(e => e.Email == UserEmail).FirstOrDefault().ID;

            var EntityUserModulePermission = _unitOfWork.UserModulePermission
                .Find(e => e.ModuleID == ModuleID
                && e.UserID == UserID
                && e.ControllerName == ControllerName
                && e.ActionName == ActionName)
                .ToList();

            //Split Role Names and then loop the RolesList to get the ID of Each Role
            string[] RolesArray = Roles.Split(',').ToArray();

            List<Entity.Role> EntityRoles = _unitOfWork.Role.GetAll().ToList();
            List<int> RoleIDs = new List<int>();
            foreach(var Role in RolesArray)
            {

                var TempEntityRoles = EntityRoles.Find(e => e.Name.ToLower() == Role.ToLower());
                if(TempEntityRoles != null)
                {
                    RoleIDs.Add(TempEntityRoles.ID);
                }

            }

            //var UserRolesList = RolesArray.Select(x => EntityRoles.Any(e => e.Name == x)).ToList();

            if (EntityUserModulePermission != null)
            {
                foreach(var UserPermission in EntityUserModulePermission)
                {
                    if (RoleIDs.Contains(UserPermission.RoleID))
                    {
                        return true;
                    }
                }
            }
            else
            {
                return false;
            }

            return false;
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult Create(DTO.UserModulePermission UserModulePermission)
        {          
                var EntityUserModulePermission = _mapper.Map<Entity.UserModulePermission>(UserModulePermission);
                _unitOfWork.UserModulePermission.Create(EntityUserModulePermission);
                _unitOfWork.Complete();

                UserModulePermission.ID = EntityUserModulePermission.ID;

                return Ok(UserModulePermission);         
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult Update(DTO.UserModulePermission UserModulePermission)
        {
            var EntityUserModulePermission = _mapper.Map<Entity.UserModulePermission>(UserModulePermission);
            _unitOfWork.UserModulePermission.Update(EntityUserModulePermission);
            _unitOfWork.Complete();

            return Ok(UserModulePermission);
        }

        [Route("[action]")]
        [HttpDelete]
        public IActionResult Delete(DTO.UserModulePermission UserModulePermission)
        {
            var EntityUserModulePermission = _unitOfWork.UserModulePermission.GetByID(UserModulePermission.ID);
            if(EntityUserModulePermission != null)
            {
                EntityUserModulePermission.IsDeleted = true;
                EntityUserModulePermission.DeleteDate = DateTime.Now;
                EntityUserModulePermission.DeleteUserID = UserModulePermission.DeleteUserID;

                _unitOfWork.Complete();
                UserModulePermission = _mapper.Map<DTO.UserModulePermission>(EntityUserModulePermission);
                return Ok(UserModulePermission);
            }
            else
            {
                return NotFound();
            }

            //return Ok(UserModulePermission);
        }

        //[Route("[action]")]
        //[HttpDelete]
        //public IActionResult DeleteAllForUser(int UserID)
        //{

        //    List<Entity.UserModulePermission> EntityAllUser = _unitOfWork.UserModulePermission.Find(e=>e.UserID == UserID).ToList();

        //    foreach(var EntityUser in EntityAllUser)
        //    {
        //        EntityUser.IsDeleted = true;
        //        EntityUser.DeleteDate = DateTime.Now;
        //        EntityUser.DeleteUserID = 1;
        //    }

        //    _unitOfWork.Complete();

        //    if(EntityAllUser != null)
        //    {
        //        return Ok();
        //    }
        //    else
        //    {
        //        return NotFound();
        //    }
        //}

    }
}
