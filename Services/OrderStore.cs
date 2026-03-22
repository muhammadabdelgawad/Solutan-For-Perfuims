using SolutanPerfumes.Models;

namespace SolutanPerfumes.Services;

public class OrderStore : IOrderStore
{
    private readonly List<Order> _orders = [];
    private readonly object _lock = new();

    public void Add(Order order)
    {
        lock (_lock)
            _orders.Insert(0, order);
    }

    public IReadOnlyList<Order> GetAll()
    {
        lock (_lock)
            return _orders.ToList();
    }
}
