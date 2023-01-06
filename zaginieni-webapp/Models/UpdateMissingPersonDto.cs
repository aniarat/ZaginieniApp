using System.ComponentModel.DataAnnotations.Schema;
using zaginieni_webapp.Entities;

namespace zaginieni_webapp.Models
{
    public class UpdateMissingPersonDto
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Gender { get; set; }

        public int Height { get; set; }
        
        public string? Figure { get; set; }

        public string? EyeColor { get; set; }

        public string? HairColor { get; set; }

        public string? SkinColor { get; set; }

        public string? CityOfResidence { get; set; }

        public string? VoivodeshipOfResidence { get; set; }

        public string? Circumstances { get; set; }

        public string? Description { get; set; }

        public string? PoliceUnit { get; set; }

        public int PoliceUnitContact { get; set; }

        public string? ReportedPolice { get; set; }

        public string? ConfirmedPolice { get; set; }

        public int ContactNumber { get; set; }

        public DateTime LastSeenDate { get; set; }

        public int Age { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string? LastSeenCity { get; set; }

        public string? Voivodeship { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
