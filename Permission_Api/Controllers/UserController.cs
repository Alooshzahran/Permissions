using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace Permission_Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserController(IUnitOfWork unitOfWork , IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var EntityUser = _unitOfWork.User.GetAll();
            var DTOUser = _mapper.Map<IEnumerable<DTO.User>>(EntityUser);
            return Ok(DTOUser);
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetByID(int ID)
        {
            var EntityUser = _unitOfWork.User.GetByID(ID);
            var DTOUser = _mapper.Map<DTO.User>(EntityUser);
            return Ok(DTOUser);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult Create(DTO.User User)
        {
            var EntityUser = _mapper.Map<Entity.User>(User);
            _unitOfWork.User.Create(EntityUser);
            _unitOfWork.Complete();

            User.ID = EntityUser.ID;

            return Ok(User);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult Update(DTO.User User)
        {
            var EntityUser = _mapper.Map<Entity.User>(User);
            _unitOfWork.User.Update(EntityUser);
            _unitOfWork.Complete();

            return Ok(User);
        }

        [Route("[action]")]
        [HttpDelete]
        public IActionResult Delete(DTO.User User)
        {
            var EntityUser = _unitOfWork.User.GetByID(User.ID);
            if (EntityUser != null)
            {
                EntityUser.IsDeleted = true;
                EntityUser.DeleteDate = DateTime.Now;
                EntityUser.DeleteUserID = User.DeleteUserID;

                _unitOfWork.Complete();
                User = _mapper.Map<DTO.User>(EntityUser);
                return Ok(User);
            }
            else
            {
                return NotFound();
            }

            //return Ok(Role);
        }
    }
}
