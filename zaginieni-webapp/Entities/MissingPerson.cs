using System.ComponentModel.DataAnnotations.Schema;

namespace zaginieni_webapp.Entities
{
    public class MissingPerson
    {
        public int Id { get; set; } // framework rozpozna to pole i utworzy dla niego primary key
        public string Status { get; set; } = "reported";

        [Column(TypeName = "nvarchar(25)")]
        public string FirstName { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }


        [Column(TypeName = "nvarchar(25)")]
        public string Gender { get; set; }

        public int Height { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        public string Figure { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        public string EyeColor { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        public string HairColor { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        public string SkinColor { get; set; }


        [Column(TypeName = "nvarchar(25)")]
        public string CityOfResidence { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        public string VoivodeshipOfResidence { get; set; }
        public DateTime LastSeenDate { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        public string LastSeenCity { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        public string Voivodeship { get; set; }

        [Column(TypeName = "nvarchar(500)")]
        public string Description { get; set; }

        [Column(TypeName = "nvarchar(500)")]
        public string Circumstances { get; set; }


        //[Column(TypeName = "nvarchar(100)")]
        //public int CreatedById { get; set; }
        //public virtual User? CreatedBy { get; set; }
        [Column(TypeName = "nvarchar(25)")]
        public string ReportedPolice { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        public string ConfirmedPolice { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? PoliceUnit { get; set; }

        public int? PoliceUnitContact { get; set; }

        
        public User? CreatedBy { get; set; }
        public int CreatedById { get; set; }
        public int ContactNumber { get; set; }

        public DateTime DateTimeCreated { get; set; } = DateTime.Now;
        public ICollection<PhotoMissingPerson>? PhotosMissingPerson { get; set; }
        public virtual List<SeenPlace>? SeenPlaces { get; set; }

        //public int LastSeenAddressId { get; set; } //foreign key - table LastSeenAddress

        //public virtual LastSeenAddress? LastSeenAddress { get; set; }
    }
}
