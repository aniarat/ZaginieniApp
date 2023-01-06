using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
//using System.Data.Entity;

namespace zaginieni_webapp.Entities
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }


        public DbSet<MissingPerson> MissingPeople { get; set; }
        public DbSet<PhotoMissingPerson> PhotosMissingPerson { get; set; }
        public DbSet<SeenPlace> SeenPlaces { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            modelBuilder.Entity<Role>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

            modelBuilder.Entity<MissingPerson>()
                 .Property(l => l.FirstName)
                 .IsRequired()
                 .HasMaxLength(25);
            
            modelBuilder.Entity<PhotoMissingPerson>(entity =>
            {
                entity.HasKey(e => e.PhotoId)
                .HasName("PK__PhotoMissingPerson");

                modelBuilder.Entity<PhotoMissingPerson>(entity =>
                {
                    entity.HasKey(e => e.PhotoId)
                    .HasName("PK__PhotoMissingPerson");

                    entity.HasOne(d => d.MissingPerson)
                        .WithMany(p => p.PhotosMissingPerson)
                        .HasForeignKey(d => d.MissingPersonId)
                        .OnDelete(DeleteBehavior.Cascade)
                        .HasConstraintName("PhotoMissingPerson_fk_MissingPerson");
                });

                modelBuilder.Entity<SeenPlace>(entity =>
                {
                    entity.HasKey(e => e.SeenPlaceId);
                    entity.HasOne(d => d.MissingPerson)
                    .WithMany(s => s.SeenPlaces)
                    .HasForeignKey(d => d.MissingPersonId)
                    .OnDelete(DeleteBehavior.NoAction);
                    //.OnDelete(DeleteBehavior.Cascade);
                    
                });
            });

            modelBuilder.Entity<User>()
                .Property(u => u.FirstName)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.LastName)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.PhoneNumber)
                .IsRequired();

            modelBuilder.Entity<Role>()
                .Property(u => u.Name)
                .IsRequired();            
        }
    }
}
