using Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryUserModulePermission:Repository<UserModulePermission>,IRepositoryUserModulePermission
    {
        private readonly DBContext _dbContext;
        public RepositoryUserModulePermission(DBContext dBContext):base(dBContext) {
            _dbContext = dBContext;
        }
        public void DeleteAllForUser(int UserID, int ModuleID, int RoleID)
        {

            List<Entity.UserModulePermission> EntityAllUser = _dbContext.UserModulePermission
                .Where(e => 
                e.UserID == UserID 
                && e.ModuleID == ModuleID
                && e.RoleID == RoleID
                && e.IsDeleted == false)
                .ToList();

            foreach (var EntityUser in EntityAllUser)
            {
                EntityUser.IsDeleted = true;
                EntityUser.DeleteDate = DateTime.Now;
                EntityUser.DeleteUserID = 1;
            }

            _dbContext.SaveChanges();

        }
    }
}
