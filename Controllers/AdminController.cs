using Microsoft.AspNetCore.Mvc;
using SolutanPerfumes.Models;
using SolutanPerfumes.Models.ViewModels;
using SolutanPerfumes.Services;

namespace SolutanPerfumes.Controllers;

public class AdminController : Controller
{
    private readonly IProductCatalog _catalog;
    private readonly IOrderStore _orders;

    public AdminController(IProductCatalog catalog, IOrderStore orders)
    {
        _catalog = catalog;
        _orders = orders;
    }

    public IActionResult Index(string tab = "products", string? edit = null)
    {
        ViewBag.Tab = tab;
        ViewBag.EditProduct = string.IsNullOrEmpty(edit) ? null : _catalog.GetById(edit);
        return View(new AdminViewModel
        {
            Products = _catalog.GetAll(),
            Orders = _orders.GetAll()
        });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult SaveProduct([FromForm] AdminProductEditModel model)
    {
        if (!ModelState.IsValid)
            return RedirectToAction(nameof(Index), new { tab = "products" });

        var p = new Product
        {
            Id = model.Id ?? "",
            Name = model.Name.Trim(),
            Description = model.Description?.Trim() ?? "",
            Price = model.Price,
            ImageUrl = string.IsNullOrWhiteSpace(model.ImageUrl) ? "/images/placeholder.svg" : model.ImageUrl.Trim(),
            Category = model.Category,
            Featured = Request.Form["Featured"].Any(v => v == "true")
        };

        if (string.IsNullOrEmpty(model.Id))
            _catalog.Add(p);
        else
            _catalog.Update(p);

        return RedirectToAction(nameof(Index), new { tab = "products" });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult DeleteProduct(string id)
    {
        _catalog.Delete(id);
        return RedirectToAction(nameof(Index), new { tab = "products" });
    }
}
