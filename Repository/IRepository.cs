using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Repository
{
    public interface IRepository<T> where T : BaseGet
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate);
        bool Delete(T Entity);
        T GetByID(int id);
        T Create(T entity);
        T Update(T entity);
    }
}
