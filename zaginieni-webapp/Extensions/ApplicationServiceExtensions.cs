using System.Configuration;
using System.Text.Json.Serialization;
using Azure.Storage.Blobs;
using Microsoft.EntityFrameworkCore;
using zaginieni_webapp.Entities;
using zaginieni_webapp.Helpers;
using zaginieni_webapp.Interfaces;
using zaginieni_webapp.Repositories;
using zaginieni_webapp.Services;

namespace zaginieni_webapp.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<AzureFaceApiSettings>(config.GetSection("AzureFaceApiSettings"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMissingPersonRepository, MissingPersonRepository>();
            services.AddTransient<IPhotoService>(_=> new PhotoService("storage", "key"));
            services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            services.AddScoped(options =>
            {
                return new BlobServiceClient(config.GetConnectionString("AzureStorage"));
            });

            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            services.AddDbContext<ApplicationDbContext>(o =>
                o.UseSqlServer(config.GetConnectionString("ZaginieniDbConnection")));

            return services;
        }
    }
}
