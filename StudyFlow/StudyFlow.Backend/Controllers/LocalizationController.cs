using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using StudyFlow.Shared;

namespace StudyFlow.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocalizationController : ControllerBase
    {
        private readonly IStringLocalizer _localizer;

        public LocalizationController(IStringLocalizer<SharedResources> localizer)
        {
            _localizer = localizer;
        }

        [HttpGet("{culture}")]
        public IActionResult GetTranslations(string culture)
        {
            CultureInfo.CurrentCulture = new CultureInfo(culture);
            CultureInfo.CurrentUICulture = new CultureInfo(culture);

            var translations = new Dictionary<string, string>();

            foreach (var resource in _localizer.GetAllStrings(includeParentCultures: false))
            {
                translations.Add(resource.Name, resource.Value);
            }

            return Ok(translations);
        }

        [HttpPost("adjust-date")]
        public IActionResult AdjustDateByUtcOffset([FromBody] AdjustDateByOffsetRequest request)
        {
            if (request == null || request.UtcOffset == null)
            {
                return BadRequest("Invalid request. Ensure you provide a valid date and UTC offset.");
            }

            try
            {
                if (request.UtcOffset < -12 || request.UtcOffset > 14)
                {
                    return BadRequest("UTC Offset must be between -12 and +14.");
                }

                var adjustedDate = request.Date.AddHours(request.UtcOffset.Value);

                return Ok(new
                {
                    OriginalDateUtc = request.Date.ToString("o"),
                    AdjustedDate = adjustedDate.ToString("o"),
                    UtcOffset = request.UtcOffset.Value
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error adjusting date: {ex.Message}");
            }
        }
    }

    public class AdjustDateByOffsetRequest
    {
        public DateTime Date { get; set; }
        public int? UtcOffset { get; set; }
    }
}