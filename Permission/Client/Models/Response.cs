using Newtonsoft.Json.Linq;
using System.Net;

namespace Connecter.Client.Models
{
    public class Response
    {
        public HttpStatusCode StatusCode { get; set; }
        public int userId { get; set; }
        public DateTime Date { get; set; }
        public bool IsSuccess { get; set; }
        public JObject Result { get; set; }
    }
}
