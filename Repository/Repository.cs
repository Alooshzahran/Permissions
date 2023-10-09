using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class Repository<T> : IRepository<T> where T : BaseGet
    {
        public DBContext RepositoryDbContext { get; set; }
        public Repository(DBContext repositoryDbContext)
        {
            RepositoryDbContext = repositoryDbContext;
        }
        public T Create(T entity)
        {
            return RepositoryDbContext.Set<T>().Add(entity).Entity;
        }

        public bool Delete(T Entity)
        {
            RepositoryDbContext.Set<T>().Remove(Entity);
            return true;
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return RepositoryDbContext.Set<T>().Where(e => e.IsDeleted == false).Where(predicate);
        }

        public IEnumerable<T> GetAll()
        {
            return RepositoryDbContext.Set<T>().Where(e => e.IsDeleted == false);
        }

        public T GetByID(int id)
        {
            return RepositoryDbContext.Set<T>().FirstOrDefault(e => e.ID == id && e.IsDeleted == false);
        }

        public T Update(T entity)
        {
            return RepositoryDbContext.Set<T>().Update(entity).Entity;
        }
    }
}
