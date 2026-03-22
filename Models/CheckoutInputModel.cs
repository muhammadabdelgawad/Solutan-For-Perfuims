using System.ComponentModel.DataAnnotations;

namespace SolutanPerfumes.Models;

public class CheckoutInputModel
{
    [Required(ErrorMessage = "الاسم مطلوب")]
    [Display(Name = "الاسم الكامل")]
    public string CustomerName { get; set; } = "";

    [Required(ErrorMessage = "رقم الهاتف مطلوب")]
    [Display(Name = "رقم الهاتف")]
    public string Phone { get; set; } = "";

    [Required(ErrorMessage = "العنوان مطلوب")]
    [Display(Name = "عنوان التوصيل")]
    public string Address { get; set; } = "";
}
