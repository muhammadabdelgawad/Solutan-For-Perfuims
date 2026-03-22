using SolutanPerfumes.Models;

namespace SolutanPerfumes.Services;

public class ProductCatalog : IProductCatalog
{
    private readonly List<Product> _products;
    private readonly object _lock = new();

    public ProductCatalog()
    {
        _products = SeedProducts().ToList();
    }

    public IReadOnlyList<Product> GetAll()
    {
        lock (_lock)
            return _products.OrderBy(p => p.Name).ToList();
    }

    public Product? GetById(string id)
    {
        lock (_lock)
            return _products.FirstOrDefault(p => p.Id == id);
    }

    public IReadOnlyList<Product> GetFeatured()
    {
        lock (_lock)
            return _products.Where(p => p.Featured).ToList();
    }

    public IReadOnlyList<Product> Filter(Category? category, string? search)
    {
        lock (_lock)
        {
            IEnumerable<Product> q = _products;
            if (category is { } c)
                q = q.Where(p => p.Category == c);
            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.Trim();
                q = q.Where(p =>
                    p.Name.Contains(s, StringComparison.OrdinalIgnoreCase) ||
                    p.Description.Contains(s, StringComparison.OrdinalIgnoreCase));
            }
            return q.ToList();
        }
    }

    public void Add(Product product)
    {
        lock (_lock)
        {
            product.Id = Guid.NewGuid().ToString("N")[..12];
            _products.Add(product);
        }
    }

    public void Update(Product product)
    {
        lock (_lock)
        {
            var i = _products.FindIndex(p => p.Id == product.Id);
            if (i >= 0)
                _products[i] = product;
        }
    }

    public bool Delete(string id)
    {
        lock (_lock)
            return _products.RemoveAll(p => p.Id == id) > 0;
    }

    private static IEnumerable<Product> SeedProducts()
    {
        const string img = "/images/placeholder.svg";
        return
        [
            new Product
            {
                Id = "1",
                Name = "روز إيتيرنيل",
                Description = "مزيج رقيق من ورد دمشقي والفاوانيا والمسك الأبيض. عطر خالد يعطي إحساس حديقة مشمسة.",
                Price = 185,
                ImageUrl = img,
                Category = Category.Perfumes,
                Featured = true
            },
            new Product
            {
                Id = "2",
                Name = "نوار أبسولو",
                Description = "عود غني، عنبر دخاني وفانيليا داكنة لعطر مسائي ساحر.",
                Price = 245,
                ImageUrl = img,
                Category = Category.Perfumes,
                Featured = true
            },
            new Product
            {
                Id = "3",
                Name = "جاردان دو فلور",
                Description = "ياسمين وبرغموت لباقة زهرية رومانسية تدوم على البشرة.",
                Price = 165,
                ImageUrl = img,
                Category = Category.Perfumes
            },
            new Product
            {
                Id = "4",
                Name = "أحمر مخملي",
                Description = "أحمر شفاه بلون خمري غني، ثبات طويل وتغليف فاخر.",
                Price = 48,
                ImageUrl = img,
                Category = Category.Makeup,
                Featured = true
            },
            new Product
            {
                Id = "5",
                Name = "باليت إشراق عاري",
                Description = "تسعة تدرجات دافئة من العاري إلى النحاسي، لامع ومطفي.",
                Price = 72,
                ImageUrl = img,
                Category = Category.Makeup
            },
            new Product
            {
                Id = "6",
                Name = "كريم لوكس مرطب",
                Description = "مرطب غني بمستخلصات فاخرة لإشراقة وترطيب عميق.",
                Price = 128,
                ImageUrl = img,
                Category = Category.Skincare,
                Featured = true
            },
            new Product
            {
                Id = "7",
                Name = "سيروم إكلات",
                Description = "سيروم خفيف بحمض الهيالورونيك وفيتامين ج لبشرة مشرقة.",
                Price = 96,
                ImageUrl = img,
                Category = Category.Skincare
            },
            new Product
            {
                Id = "8",
                Name = "كريم هيدرا سيلك",
                Description = "كريم حريري يملّس الخطوط ويرطّب طوال اليوم.",
                Price = 84,
                ImageUrl = img,
                Category = Category.Skincare
            }
        ];
    }
}
