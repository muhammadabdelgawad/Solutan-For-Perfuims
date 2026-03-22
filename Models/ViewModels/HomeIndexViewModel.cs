using SolutanPerfumes.Models;

namespace SolutanPerfumes.Models.ViewModels;

public class HomeIndexViewModel
{
    public IReadOnlyList<Product> Featured { get; set; } = [];
    public IReadOnlyDictionary<Category, string> CategoryHeroImages { get; set; } =
        new Dictionary<Category, string>();
}
