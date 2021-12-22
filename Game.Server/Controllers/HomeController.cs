using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Game.Server.Controllers
{
    [Route("home")]
    public class HomeController : Controller
    {
        [HttpGet]
        public string Index()
        {
            return "hello world";
        }

       
    }
}
