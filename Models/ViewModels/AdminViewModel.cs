using SolutanPerfumes.Models;

namespace SolutanPerfumes.Models.ViewModels;

public class AdminViewModel
{
    public IReadOnlyList<Product> Products { get; set; } = [];
    public IReadOnlyList<Order> Orders { get; set; } = [];
}
