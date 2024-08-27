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
    }
}