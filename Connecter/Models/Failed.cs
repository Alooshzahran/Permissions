using Newtonsoft.Json.Linq;

namespace Connecter.Models
{
    public class Failed
    {
        public string Type { get; set; }
        public string Title { get; set; }
        public int Status { get; set; }
        public string TraceId { get; set; }
        public JObject Errors { get; set; }
    }
}
