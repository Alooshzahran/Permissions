using AutoMapper;
using DTO;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace Permission_Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RoleController(IUnitOfWork unitOfWork,IMapper iMapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = iMapper;
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var EntityRoles = _unitOfWork.Role.GetAll();
            var DTORoles = _mapper.Map<IEnumerable<DTO.Role>>(EntityRoles);
            return Ok(DTORoles);
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult GetByID(int ID)
        {
            var EntityRole = _unitOfWork.Role.GetByID(ID);
            var DTORole = _mapper.Map<DTO.Role>(EntityRole);
            return Ok(DTORole);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult Create(DTO.Role Role)
        {          
                var EntityRole = _mapper.Map<Entity.Role>(Role);
                _unitOfWork.Role.Create(EntityRole);
                _unitOfWork.Complete();

                Role.ID = EntityRole.ID;

                return Ok(Role);         
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult Update(DTO.Role Role)
        {
            var EntityRole = _mapper.Map<Entity.Role>(Role);
            _unitOfWork.Role.Update(EntityRole);
            _unitOfWork.Complete();

            return Ok(Role);
        }

        [Route("[action]")]
        [HttpDelete]
        public IActionResult Delete(DTO.Role Role)
        {
            var EntityRole = _unitOfWork.Role.GetByID(Role.ID);
            if(EntityRole != null)
            {
                EntityRole.IsDeleted = true;
                EntityRole.DeleteDate = DateTime.Now;
                EntityRole.DeleteUserID = Role.DeleteUserID;

                _unitOfWork.Complete();
                Role = _mapper.Map<DTO.Role>(EntityRole);
                return Ok(Role);
            }
            else
            {
                return NotFound();
            }

            //return Ok(Role);
        }


    }
}
