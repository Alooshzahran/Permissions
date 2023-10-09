using DTO;

namespace Connecter.Client.Models
{
    public class Resource : Base
    {
        public int? CodeTypeiD { get; set; }
        public CodeType CodeType { get; set; }
        public int? LanguageID{ get; set; }
        public Language Language  { get; set; }
        public string? Code { get; set; }
        public string? Value { get; set; }
    }
}
