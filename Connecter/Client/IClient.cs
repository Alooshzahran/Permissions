using Connecter.Models;
using DTO;

namespace Connecter.Client
{
    public interface IClient<T> where T : Base
    {
        public Task<IEnumerable<T>> GetAll();
        public Task<T> GetByID(int ID);
        public Task<Response> Create(T Obj);
        public Task<Response> Update(T Obj);
        public Task<T> Delete(T Obj);
    }
}