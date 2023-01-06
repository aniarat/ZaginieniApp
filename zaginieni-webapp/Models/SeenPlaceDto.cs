namespace zaginieni_webapp.Models
{
    public class SeenPlaceDto
    {
        public int SeenPlaceId { get; set; }
        public DateTime SeenDate { get; set; }
        public string? City { get; set; }
        public string? Street { get; set; }
        public string? Voivodeship { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string? Comment { get; set; }
        public string Status { get; set; } = "reported";
        public int MissingPersonId { get; set; }
    }
}
