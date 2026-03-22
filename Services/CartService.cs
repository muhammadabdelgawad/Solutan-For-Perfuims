using System.Text.Json;
using Microsoft.AspNetCore.Http;
using SolutanPerfumes.Models;

namespace SolutanPerfumes.Services;

public class CartService : ICartService
{
    private const string SessionKey = "CartLines";
    private readonly IHttpContextAccessor _http;
    private readonly IProductCatalog _catalog;

    public CartService(IHttpContextAccessor http, IProductCatalog catalog)
    {
        _http = http;
        _catalog = catalog;
    }

    private ISession Session => _http.HttpContext?.Session
        ?? throw new InvalidOperationException("Session not available.");

    private List<CartLine> Load()
    {
        var raw = Session.GetString(SessionKey);
        if (string.IsNullOrEmpty(raw))
            return [];
        try
        {
            return JsonSerializer.Deserialize<List<CartLine>>(raw) ?? [];
        }
        catch
        {
            return [];
        }
    }

    private void Save(List<CartLine> lines)
    {
        Session.SetString(SessionKey, JsonSerializer.Serialize(lines));
    }

    public int ItemCount => Load().Sum(l => l.Quantity);

    public decimal Total => GetLines().Sum(x => x.Product.Price * x.Quantity);

    public IReadOnlyList<(Product Product, int Quantity)> GetLines()
    {
        var lines = Load();
        var result = new List<(Product, int)>();
        foreach (var line in lines)
        {
            var p = _catalog.GetById(line.ProductId);
            if (p is not null)
                result.Add((p, line.Quantity));
        }
        return result;
    }

    public void Add(string productId)
    {
        if (_catalog.GetById(productId) is null)
            return;
        var lines = Load();
        var existing = lines.FirstOrDefault(l => l.ProductId == productId);
        if (existing is not null)
            existing.Quantity++;
        else
            lines.Add(new CartLine { ProductId = productId, Quantity = 1 });
        Save(lines);
    }

    public void UpdateQuantity(string productId, int quantity)
    {
        var lines = Load();
        var i = lines.FindIndex(l => l.ProductId == productId);
        if (i < 0)
            return;
        if (quantity <= 0)
            lines.RemoveAt(i);
        else
            lines[i].Quantity = quantity;
        Save(lines);
    }

    public void Remove(string productId)
    {
        var lines = Load();
        lines.RemoveAll(l => l.ProductId == productId);
        Save(lines);
    }

    public void Clear()
    {
        Session.Remove(SessionKey);
    }
}
