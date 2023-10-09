using AutoMapper;

namespace Permission_Api.Helper
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<Entity.Role, DTO.Role>();
            CreateMap<DTO.Role, Entity.Role>()
                .AfterMap((source, target) =>
                {
                    if(target.ID == 0)
                    {
                        target.ModifyingUserID = null;
                        target.DeleteUserID = null;
                        target.ModifyingDate = null;
                        target.DeleteDate = null;
                        target.IsDeleted = false;
                    }
                });


            CreateMap<Entity.User, DTO.User>();
            CreateMap<DTO.User, Entity.User>()
                .AfterMap((source, target) =>
                {
                    if (target.ID == 0)
                    {
                        target.ModifyingUserID = null;
                        target.DeleteUserID = null;
                        target.ModifyingDate = null;
                        target.DeleteDate = null;
                        target.IsDeleted = false;
                    }
                });

            CreateMap<Entity.UserRole, DTO.UserRole>();
            CreateMap<DTO.UserRole, Entity.UserRole>()
                .AfterMap((source, target) =>
                {
                    if (target.ID == 0)
                    {
                        target.ModifyingUserID = null;
                        target.DeleteUserID = null;
                        target.ModifyingDate = null;
                        target.DeleteDate = null;
                        target.IsDeleted = false;
                    }
                });

            CreateMap<Entity.Module, DTO.Module>();
            CreateMap<DTO.Module, Entity.Module>()
                .AfterMap((source, target) =>
                {
                    if (target.ID == 0)
                    {
                        target.ModifyingUserID = null;
                        target.DeleteUserID = null;
                        target.ModifyingDate = null;
                        target.DeleteDate = null;
                        target.IsDeleted = false;
                    }
                });

            CreateMap<Entity.ModuleProperties, DTO.ModuleProperties>();
            CreateMap<DTO.ModuleProperties, Entity.ModuleProperties>()
                .AfterMap((source, target) =>
                {
                    if (target.ID == 0)
                    {
                        target.ModifyingUserID = null;
                        target.DeleteUserID = null;
                        target.ModifyingDate = null;
                        target.DeleteDate = null;
                        target.IsDeleted = false;
                    }
                });

            CreateMap<Entity.UserModulePermission, DTO.UserModulePermission>();
            CreateMap<DTO.UserModulePermission, Entity.UserModulePermission>()
                .AfterMap((source, target) =>
                {
                    if (target.ID == 0)
                    {
                        target.ModifyingUserID = null;
                        target.DeleteUserID = null;
                        target.ModifyingDate = null;
                        target.DeleteDate = null;
                        target.IsDeleted = false;
                    }
                });
        }
    }
}
