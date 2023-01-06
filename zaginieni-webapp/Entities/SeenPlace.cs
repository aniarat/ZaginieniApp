using System.ComponentModel.DataAnnotations;

namespace zaginieni_webapp.Entities
{
    public class SeenPlace
    {
        [Key]
        public int SeenPlaceId { get; set; }
        public string Status { get; set; } = "reported";
        public MissingPerson? MissingPerson { get; set; }
        public int MissingPersonId { get; set; }

        public DateTime SeenDate { get; set; }
        public string? City { get; set; }
        public string? Street { get; set; }
        public string? Voivodeship { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string? Comment { get; set; }
        public User? CreatedBy { get; set; }
        public int CreatedById { get; set; }
        public DateTime DateTimeCreated { get; set; } = DateTime.Now;


    }
}
