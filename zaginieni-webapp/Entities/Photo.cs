using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace zaginieni_webapp.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string? Url { get; set; }
        //public string? ContentType { get; set; }
        public bool IsMain { get; set; }
        public string? PublicId { get; set; }
        public MissingPerson? MissingPerson { get; set; }
        public int MissingPersonId { get; set; }

    }
}
