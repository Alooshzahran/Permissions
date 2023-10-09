using AutoMapper;
using DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace Permission_Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserRoleController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserRoleController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var EntityUserRole = _unitOfWork.UserRole.GetAll();
            var DTOUserRole = _mapper.Map<IEnumerable<DTO.UserRole>>(EntityUserRole);
            return Ok(DTOUserRole);
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetByID(int ID)
        {
            var EntityUserRole = _unitOfWork.UserRole.GetByID(ID);
            var DTOUserRole = _mapper.Map<DTO.UserRole>(EntityUserRole);
            return Ok(DTOUserRole);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult Create(DTO.UserRole UserRole)
        {
            var EntityUserRole = _mapper.Map<Entity.UserRole>(UserRole);
            _unitOfWork.UserRole.Create(EntityUserRole);

            /***********************  Save List of UserModulePermission  **************************/

            List<Entity.ModuleProperties> ModuleProperties = _unitOfWork.ModuleProperties.Find(e=>e.ModuleID == UserRole.ModuleID).ToList();
            foreach(var Property in ModuleProperties)
            {
                var TempUserModulePermission = new Entity.UserModulePermission
                {
                    UserID = UserRole.UserID ?? 0,
                    ModuleID = UserRole.ModuleID ?? 0,
                    RoleID = UserRole.RoleID ?? 0,
                    ControllerName = Property.ControllerName,
                    ActionName = Property.ActionName
                };
                _unitOfWork.UserModulePermission.Create(TempUserModulePermission);
            }

            /*************************************************/

            _unitOfWork.Complete();

            UserRole.ID = EntityUserRole.ID;

            return Ok(UserRole);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult Update(DTO.UserRole UserRole)
        {

            var EntityUserRole = _mapper.Map<Entity.UserRole>(UserRole);
            _unitOfWork.UserRole.Update(EntityUserRole);

            /***********************  Save List of UserModulePermission  **************************/

            List<Entity.ModuleProperties> ModuleProperties = _unitOfWork.ModuleProperties.Find(e => e.ModuleID == UserRole.ModuleID && e.IsDeleted == false).ToList();
            foreach (var Property in ModuleProperties)
            {
                var TempUserModulePermission = new Entity.UserModulePermission
                {
                    UserID = EntityUserRole.UserID,
                    ModuleID = EntityUserRole.ModuleID,
                    RoleID = EntityUserRole.RoleID,
                    ControllerName = Property.ControllerName,
                    ActionName = Property.ActionName
                };
                _unitOfWork.UserModulePermission.Create(TempUserModulePermission);
            }

            /*************************************************/


            _unitOfWork.Complete();

            return Ok(UserRole);
        }

        [Route("[action]")]
        [HttpDelete]
        public IActionResult Delete(DTO.UserRole UserRole)
        {
            var EntityUserRole = _unitOfWork.UserRole.GetByID(UserRole.ID);
            if (EntityUserRole != null)
            {
                EntityUserRole.IsDeleted = true;
                EntityUserRole.DeleteDate = DateTime.Now;
                EntityUserRole.DeleteUserID = UserRole.DeleteUserID;

                _unitOfWork.UserModulePermission.DeleteAllForUser(EntityUserRole.UserID, EntityUserRole.ModuleID, EntityUserRole.RoleID);

                _unitOfWork.Complete();
                UserRole = _mapper.Map<DTO.UserRole>(EntityUserRole);
                return Ok(UserRole);
            }
            else
            {
                return NotFound();
            }

            //return Ok(Role);
        }
    }
}
