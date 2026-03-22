using Microsoft.AspNetCore.Mvc;
using SolutanPerfumes.Services;

namespace SolutanPerfumes.Controllers;

public class CartController : Controller
{
    private readonly ICartService _cart;

    public CartController(ICartService cart)
    {
        _cart = cart;
    }

    public IActionResult Index()
    {
        return View(_cart.GetLines());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Add(string productId, string? returnUrl)
    {
        _cart.Add(productId);
        if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
            return Redirect(returnUrl);
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Update(string productId, int quantity)
    {
        _cart.UpdateQuantity(productId, quantity);
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Remove(string productId)
    {
        _cart.Remove(productId);
        return RedirectToAction(nameof(Index));
    }
}
