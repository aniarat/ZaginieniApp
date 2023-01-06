using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

Log.Information("Starting up");

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog((context, services, configuration) => configuration
       .ReadFrom.Configuration(context.Configuration)
       .ReadFrom.Services(services)
       .WriteTo.ApplicationInsights(
            services.GetRequiredService<Microsoft.ApplicationInsights.Extensibility.TelemetryConfiguration>(),
            TelemetryConverter.Traces)
       //.WriteTo.ApplicationInsights .Appli(TelemetryConverter.Traces)
       .Enrich.FromLogContext());

    // Add Services to the container.

    builder.Services.AddApplicationServices(builder.Configuration);

    builder.Services.AddIdentityServices(builder.Configuration);

    builder.Services.AddControllers();

    builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

    builder.Services.AddScoped<ErrorHandlingMiddleware>();

    //builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

    builder.Services.AddScoped<IValidator<RegisterUserDto>, RegisterUserDtoValidator>();

    builder.Services.AddHttpContextAccessor();

    builder.WebHost.UseNLog();

    builder.Services.AddSwaggerGen();

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("FrontEndClient", builder =>
            builder.AllowAnyMethod()
                .AllowAnyHeader()
                .WithOrigins("https://zaginieni-app.netlify.app")
        );
    });
   
    builder.Services.AddApplicationInsightsTelemetry(builder.Configuration["APPLICATIONINSIGHTS_CONNECTION_STRING"]);

    var app = builder.Build(); 
    app.UseSerilogRequestLogging(configure =>
    {
        configure.MessageTemplate = "HTTP {RequestMethod} {RequestPath} ({UserId}) responded {StatusCode} in {Elapsed:0.0000}ms";
    }); 

    app.MapGet("/", () => "Hello World!");

    app.UseMiddleware<ExceptionMiddleware>();

    app.UseHttpsRedirection();

    app.UseCors("FrontEndClient");

    app.UseAuthentication(); 
    app.UseAuthorization();

    app.UseStaticFiles();

    var scope = app.Services.CreateScope(); 

    var services = scope.ServiceProvider;
    
    try
    {

        var context = services.GetRequiredService<ApplicationDbContext>();
        var userManager = services.GetRequiredService<UserManager<User>>();
        var roleManager = services.GetRequiredService<RoleManager<Role>>();
        await ApplicationSeeder.SeedUsers(userManager, roleManager);
        var pendingMigrations = context.Database.GetPendingMigrations();

        if (pendingMigrations != null && pendingMigrations.Any())
        {
            await context.Database.MigrateAsync();
        }
        
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred during migration");
    }

    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Zaginieni API");
    });

    app.MapControllers(); 

    //app.Run();

    await app.RunAsync();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    Log.Information("Shut down complete");
    Log.CloseAndFlush();
}

