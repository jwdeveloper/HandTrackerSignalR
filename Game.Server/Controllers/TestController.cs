using Microsoft.AspNetCore.Mvc;

namespace Game.Server.Controllers
{
    [Route("/test")]
    public class TestController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return Json(new { id = 1, name = "test" });
        }
    }
}
