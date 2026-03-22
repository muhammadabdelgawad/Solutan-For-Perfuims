using SolutanPerfumes.Models;

namespace SolutanPerfumes.Helpers;

public static class CategoryLabels
{
    public static string Arabic(Category c) => c switch
    {
        Category.Perfumes => "عطور",
        Category.Makeup => "مكياج",
        Category.Skincare => "عناية بالبشرة",
        _ => c.ToString()
    };

    public static string OrderStatusArabic(string status) => status switch
    {
        "pending" => "قيد الانتظار",
        "confirmed" => "مؤكد",
        "shipped" => "تم الشحن",
        "delivered" => "تم التسليم",
        _ => status
    };
}
