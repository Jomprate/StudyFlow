using Microsoft.AspNetCore.Mvc;
using StudyFlow.DAL.Data;

[ApiController]
[Route("api/[controller]")]
public class StatusController : ControllerBase
{
    private readonly DataContext _context;

    public StatusController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetStatus()
    {
        // Verifica si la conexión a la base de datos está disponible
        var canConnectToDatabase = _context.Database.CanConnect();

        // Si hay algún otro servicio que quieras verificar, puedes hacerlo aquí
        if (canConnectToDatabase)
        {
            return Ok(new { status = "ready" });
        }

        return StatusCode(503, new { status = "not_ready" });
    }
}