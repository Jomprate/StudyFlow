using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.BLL.Interfaces;
using StudyFlow.DAL.Entities;

namespace StudyFlow.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationController : ControllerBase
{
    private readonly INotificationService _serviceNotification;

    public NotificationController(INotificationService serviceNotification)
    {
        _serviceNotification = serviceNotification;
    }

    #region GetAllNotifications

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAsync()
    {
        try
        {
            return await _serviceNotification.GetNotificationsAsync();
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Error = "An unexpected error occurred.", Detalles = ex.Message });
        }
    }

    #endregion GetAllNotifications

    #region GetNotificationById

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetByIdAsync(Guid id)
    {
        try
        {
            return await _serviceNotification.GetNotificationByIdAsync(id); ;
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Error = "An unexpected error occurred.", Detalles = ex.Message });
        }
    }

    #endregion GetNotificationById

    #region CreateNotification

    [HttpPost("/createNotification")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Post(NotificationDTO notification)
    {
        try
        {
            return await _serviceNotification.CreateNotificationAsync(notification);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Error = "An unexpected error occurred.", Detalles = ex.Message });
        }
    }

    #endregion CreateNotification

    #region UpdateNotification

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> PutAsync(NotificationDTO notification)
    {
        try
        {
            return await _serviceNotification.UpdateNotificationAsync(notification);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Error = "An unexpected error occurred.", Detalles = ex.Message });
        }
    }

    #endregion UpdateNotification

    #region DeleteNotification

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteNotificationAsync(Guid id)
    {
        try
        {
            return await _serviceNotification.DeleteNotificationAsync(id);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Error = "An unexpected error occurred.", Detalles = ex.Message });
        }
    }

    #endregion DeleteNotification
}