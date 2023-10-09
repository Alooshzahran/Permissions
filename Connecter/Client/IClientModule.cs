using Connecter.Models;
using DTO;
using Microsoft.AspNetCore.Http;

namespace Connecter.Client
{
    public interface IClientModule : IClient<Module>
    {
        public Task<Response> Create(DTO.Module Module, IFormFile? file);
        public Task<Response> Update(DTO.Module Module, IFormFile? file);
    }
}
