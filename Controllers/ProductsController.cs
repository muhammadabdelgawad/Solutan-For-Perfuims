using Microsoft.AspNetCore.Mvc;
using SolutanPerfumes.Models;
using SolutanPerfumes.Models.ViewModels;
using SolutanPerfumes.Services;

namespace SolutanPerfumes.Controllers;

public class ProductsController : Controller
{
    private readonly IProductCatalog _catalog;

    public ProductsController(IProductCatalog catalog)
    {
        _catalog = catalog;
    }

    public IActionResult Index(string? category, string? search)
    {
        Category? cat = null;
        if (!string.IsNullOrEmpty(category) && Enum.TryParse<Category>(category, true, out var parsed))
            cat = parsed;

        var vm = new ProductsIndexViewModel
        {
            Products = _catalog.Filter(cat, search),
            ActiveCategory = cat,
            Search = search
        };
        return View(vm);
    }

    public IActionResult Detail(string id)
    {
        var p = _catalog.GetById(id);
        if (p is null)
            return NotFound();

        var related = _catalog.Filter(p.Category, null)
            .Where(x => x.Id != p.Id)
            .Take(3)
            .ToList();

        return View(new ProductDetailViewModel { Product = p, Related = related });
    }
}
