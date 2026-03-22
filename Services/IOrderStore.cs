using SolutanPerfumes.Models;

namespace SolutanPerfumes.Services;

public interface IOrderStore
{
    void Add(Order order);
    IReadOnlyList<Order> GetAll();
}
