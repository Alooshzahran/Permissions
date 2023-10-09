using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace Permission_Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[Controller]")]
    public class ModulePropertiesController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ModulePropertiesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var EntityModuleProperties = _unitOfWork.ModuleProperties.GetAll();
            var DTOModuleProperties = _mapper.Map<IEnumerable<DTO.ModuleProperties>>(EntityModuleProperties);
            return Ok(DTOModuleProperties);
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult GetByID(int id) 
        {
            var EntityModuleProperties = _unitOfWork.ModuleProperties.GetByID(id);
            var DTOModuleProperties = _mapper.Map<DTO.ModuleProperties>(EntityModuleProperties);
            return Ok(DTOModuleProperties);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult Create(DTO.ModuleProperties moduleProperties)
        {
            var DTOModuleProperties = moduleProperties;
            var EntityModuleProperties = _mapper.Map<Entity.ModuleProperties>(DTOModuleProperties);

            _unitOfWork.ModuleProperties.Create(EntityModuleProperties);
            _unitOfWork.Complete();

            DTOModuleProperties.ID = EntityModuleProperties.ID;
            return Ok(DTOModuleProperties);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult Update(DTO.ModuleProperties moduleProperties)
        {
            var DTOModuleProperties = moduleProperties;
            var EntityModuleProperties = _mapper.Map<Entity.ModuleProperties>(DTOModuleProperties);

            _unitOfWork.ModuleProperties.Update(EntityModuleProperties);
            _unitOfWork.Complete();

            return Ok(DTOModuleProperties);
        }

        [Route("[action]")]
        [HttpDelete]
        public IActionResult Delete(DTO.ModuleProperties moduleProperties)
        {
            var EntityModuleProperties = _unitOfWork.ModuleProperties.GetByID(moduleProperties.ID);
            if (EntityModuleProperties != null)
            {
                EntityModuleProperties.IsDeleted = true;
                EntityModuleProperties.DeleteDate = DateTime.Now;
                EntityModuleProperties.DeleteUserID = moduleProperties.DeleteUserID;

                _unitOfWork.Complete();
                moduleProperties = _mapper.Map<DTO.ModuleProperties>(EntityModuleProperties);
                return Ok(moduleProperties);
            }
            else
            {
                return NotFound();
            }
        }

    }
}
