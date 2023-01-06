using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using zaginieni_webapp.Entities;

namespace zaginieni_webapp.Models
{
    public class MissingPersonDto
    {
        public int Id { get; set; }
        public string Status { get; set; } = "reported";

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        [Range(0, 250)]
        public int Height { get; set; }

        [Required]
        public string Figure { get; set; }

        [Required]
        public string EyeColor { get; set; }

        [Required]
        public string HairColor { get; set; }

        [Required]
        public string SkinColor { get; set; }

        [Required]
        public string CityOfResidence { get; set; }

        [Required]
        public string VoivodeshipOfResidence { get; set; }

        [Required]
        public string Circumstances { get; set; }

        [Required]
        public string Description { get; set; }

        public string? PoliceUnit { get; set; }

        public int? PoliceUnitContact { get; set; }

        public string ReportedPolice { get; set; }

        public string ConfirmedPolice { get; set; }

        [Required]
        public int ContactNumber { get; set; }

        [Required]
        public DateTime LastSeenDate { get; set; }

        public int Age { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string LastSeenCity { get; set; }

        [Required]
        public string Voivodeship { get; set; }

        public ICollection<PhotoMissingPerson>? PhotosMissingPerson { get; set; }

        public int CreatedById { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
