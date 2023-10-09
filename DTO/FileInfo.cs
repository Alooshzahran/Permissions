using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class FileInfo
    {
        public byte[]? Bytes { get; set; }
        public string? FileName { get; set; }
        public string? ContentType { get; set; }
    }
}
