using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace zaginieni_webapp.Entities
{
    public class PhotoMissingPerson
    {
        [Key]
        public int PhotoId { get; set; }
        public MissingPerson? MissingPerson { get; set; }
        public int MissingPersonId { get; set; }
        public string? PhotoFileName { get; set; }
        public string? PhotoFileType { get; set; }
        public string? PhotoUrl { get; set; }
        public DateTime DateTimeCreated { get; set; } = DateTime.Now;
        

        //[Key]
        //public int PhotoMissingPersonId { get; set; }
        //public string? MissingPersonId { get; set; }
        //public string? ImageName { get; set; }
        //public string? ImagePath { get; set; }
    }
}
