using SolutanPerfumes.Models;

namespace SolutanPerfumes.Services;

public interface IProductCatalog
{
    IReadOnlyList<Product> GetAll();
    Product? GetById(string id);
    IReadOnlyList<Product> GetFeatured();
    IReadOnlyList<Product> Filter(Category? category, string? search);
    void Add(Product product);
    void Update(Product product);
    bool Delete(string id);
}
