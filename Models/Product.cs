namespace SolutanPerfumes.Models;

public class Product
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public decimal Price { get; set; }
    /// <summary>Path under wwwroot, e.g. /images/products/perfume-1.jpg</summary>
    public string ImageUrl { get; set; } = "";
    public Category Category { get; set; }
    public bool Featured { get; set; }
}
