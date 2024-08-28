using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using StudyFlow.BLL.Interfaces;
using StudyFlow.BLL.Services;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Interfaces;
using StudyFlow.DAL.Services;

var builder = WebApplication.CreateBuilder(args);

// Configuración de servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer("name=LocalConnection"));
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<ICountryService, CountryService>();
builder.Services.AddScoped<IInstitutionService, InstitutionService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddCors();
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources"); // Agrega la localización

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