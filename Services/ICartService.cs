using SolutanPerfumes.Models;

namespace SolutanPerfumes.Services;

public interface ICartService
{
    int ItemCount { get; }
    decimal Total { get; }
    IReadOnlyList<(Product Product, int Quantity)> GetLines();
    void Add(string productId);
    void UpdateQuantity(string productId, int quantity);
    void Remove(string productId);
    void Clear();
}
