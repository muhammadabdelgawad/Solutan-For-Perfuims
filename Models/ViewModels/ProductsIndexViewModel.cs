using SolutanPerfumes.Models;

namespace SolutanPerfumes.Models.ViewModels;

public class ProductsIndexViewModel
{
    public IReadOnlyList<Product> Products { get; set; } = [];
    public Category? ActiveCategory { get; set; }
    public string? Search { get; set; }
}
