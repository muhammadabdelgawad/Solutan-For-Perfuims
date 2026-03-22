using Microsoft.AspNetCore.Mvc;
using SolutanPerfumes.Models;
using SolutanPerfumes.Models.ViewModels;
using SolutanPerfumes.Services;

namespace SolutanPerfumes.Controllers;

public class HomeController : Controller
{
    private readonly IProductCatalog _catalog;

    public HomeController(IProductCatalog catalog)
    {
        _catalog = catalog;
    }

    public IActionResult Index()
    {
        var all = _catalog.GetAll();
        var dict = new Dictionary<Category, string>();
        foreach (var c in Enum.GetValues<Category>())
        {
            var img = all.FirstOrDefault(p => p.Category == c)?.ImageUrl ?? "/images/placeholder.svg";
            dict[c] = img;
        }

        var vm = new HomeIndexViewModel
        {
            Featured = _catalog.GetFeatured(),
            CategoryHeroImages = dict
        };
        return View(vm);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View();
    }
}
