using System.Globalization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StudyFlow.BLL.Interfaces;
using StudyFlow.BLL.Services;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Interfaces;
using StudyFlow.DAL.Services;
using Azure.Identity;
using StudyFlow.Infrastructure.Interfaces;
using StudyFlow.Infrastructure.Services;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Repositories;
using Microsoft.Extensions.DependencyInjection;
using StudyFlow.Backend;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
var keyVaultUri = builder.Configuration["AzureKeyVault:VaultUri"];
var imageContainer = builder.Configuration["AzureContainerName:ImageContainer"];
var jwtService = new JwtService(builder.Configuration);
// Configuración de servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<ISubjectRepository, SubjectRepository>();
builder.Services.AddScoped<IEnrollmentRepository, EnrollmentRepository>();
builder.Services.AddScoped<ICountryService, CountryService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IOnBoardingStudentService, OnBoardingStudentService>();
builder.Services.AddScoped<IOnBoardingTeacherService, OnBoardingTeacherService>();
builder.Services.AddScoped<IAnnounceRepository, AnnounceRepository>();
builder.Services.AddScoped<IAnnounceService, AnnounceService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IMailService, MailService>();
builder.Services.AddSingleton<IJwtService>(jwtService);
builder.Services.AddSingleton<IKeyVaultService>(new KeyVaultService(builder.Configuration, builder.Environment.IsDevelopment()));
builder.Services.AddSingleton<IStorageService>(builder.Environment.IsDevelopment() ? new LocalStorageService(builder.Configuration) : new BlobStorageService(builder.Configuration));
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer("name = StudyFlowDB"));
builder.Services.AddIdentity<User, IdentityRole<Guid>>(x =>
{
    x.User.RequireUniqueEmail = true;
    x.Password.RequireDigit = false;
    x.Password.RequiredUniqueChars = 0;
    x.Password.RequireLowercase = false;
    x.Password.RequireNonAlphanumeric = false;
    x.Password.RequireUppercase = false;
    x.SignIn.RequireConfirmedEmail = true;
    x.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    x.Lockout.MaxFailedAccessAttempts = 5;
    x.Lockout.AllowedForNewUsers = true;
})
    .AddEntityFrameworkStores<DataContext>()
    .AddDefaultTokenProviders();

builder.Services.AddCors();
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources"); // Agrega la localización
jwtService.ConfigureJwtAuthentication(builder.Services);
builder.Services.AddAuthorization();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "StudyFlow Backend", Version = "v1" });

    // Añade el filtro personalizado
    c.OperationFilter<AuthorizationHeaderOperationFilter>();

    // Define el esquema de seguridad global
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter JWT token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                    },
                    new string[] {}
                }
            });
});

// Configuración del middleware de localización
var app = builder.Build();

// Crear un ámbito para el DbContext y realizar el seeding
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DataContext>();

    context.Database.EnsureCreated(); // Asegura que la base de datos esté creada

    context.Seed(); // Inserta los datos de seeding
}

// Configura las culturas soportadas
var supportedCultures = new[] { "en", "es" };
var localizationOptions = new RequestLocalizationOptions
{
    DefaultRequestCulture = new RequestCulture("en"),
    SupportedCultures = supportedCultures.Select(c => new CultureInfo(c)).ToList(),
    SupportedUICultures = supportedCultures.Select(c => new CultureInfo(c)).ToList(),
};

// Middleware para aplicar la localización
app.UseRequestLocalization(localizationOptions);
var blobStorageService = app.Services.GetRequiredService<IStorageService>();
blobStorageService.ConfigureBlobStorage(builder.Services);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configuración de CORS
//app.UseCors(x => x
//    .AllowAnyMethod()
//    .AllowAnyHeader()
//    .WithOrigins("http://localhost:5173")
//    .SetIsOriginAllowed(origin => true)
//    .AllowCredentials());

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .WithOrigins("http://localhost:5173")
    .AllowCredentials());


app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// Mapeo de los controladores
app.MapControllers();

app.Run();