using DTO;

namespace Connecter.Client.Models
{
    public class Language : Base
    {
        public string? Name { get; set; }
        public string? ShortName { get; set; }
        public string? Icon { get; set; }
        public string? DatatableUrl { get; set; }
        public bool IsRTL { get; set; }
        public bool IsDefault { get; set; }
    }
}
