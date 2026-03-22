using SolutanPerfumes.Models;

namespace SolutanPerfumes.Models.ViewModels;

public class ProductDetailViewModel
{
    public Product Product { get; set; } = null!;
    public IReadOnlyList<Product> Related { get; set; } = [];
}
