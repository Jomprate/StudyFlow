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

var builder = WebApplication.CreateBuilder(args);
var keyVaultUri = builder.Configuration["AzureKeyVault:VaultUri"];
var imageContainer = builder.Configuration["AzureContainerName:ImageContainer"];
// Configuración de servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
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
builder.Services.AddSingleton<IJwtService>(new JwtService(builder.Configuration));
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
})
    .AddEntityFrameworkStores<DataContext>()
    .AddDefaultTokenProviders();

builder.Services.AddCors();
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources"); // Agrega la localización
var jwtService = new JwtService(builder.Configuration);
jwtService.ConfigureJwtAuthentication(builder.Services);
builder.Services.AddAuthorization();

// Configuración del middleware de localización
var app = builder.Build();

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

app.UseHttpsRedirection();
app.UseAuthorization();

// Mapeo de los controladores
app.MapControllers();

// Configuración de CORS
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .WithOrigins("http://localhost:5173")
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());

app.Run();