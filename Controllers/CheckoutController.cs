using Microsoft.AspNetCore.Mvc;
using SolutanPerfumes.Models;
using SolutanPerfumes.Services;

namespace SolutanPerfumes.Controllers;

public class CheckoutController : Controller
{
    private readonly ICartService _cart;
    private readonly IOrderStore _orders;

    public CheckoutController(ICartService cart, IOrderStore orders)
    {
        _cart = cart;
        _orders = orders;
    }

    [HttpGet]
    public IActionResult Index()
    {
        if (_cart.GetLines().Count == 0)
            return RedirectToAction("Index", "Cart");

        return View(new CheckoutInputModel());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Index(CheckoutInputModel model)
    {
        if (_cart.GetLines().Count == 0)
            return RedirectToAction("Index", "Cart");

        if (!ModelState.IsValid)
            return View(model);

        var lines = _cart.GetLines();
        var order = new Order
        {
            Id = Guid.NewGuid(),
            Total = _cart.Total,
            CustomerName = model.CustomerName.Trim(),
            Phone = model.Phone.Trim(),
            Address = model.Address.Trim(),
            PaymentMethod = "cod",
            Status = "pending",
            CreatedAt = DateTimeOffset.UtcNow,
            Lines = lines.Select(x => new OrderLine { Product = x.Product, Quantity = x.Quantity }).ToList()
        };
        _orders.Add(order);
        _cart.Clear();

        TempData["OrderId"] = order.Id.ToString();
        return RedirectToAction(nameof(Confirm));
    }

    [HttpGet]
    public IActionResult Confirm()
    {
        if (TempData["OrderId"] is null)
            return RedirectToAction("Index", "Products");
        return View();
    }
}
