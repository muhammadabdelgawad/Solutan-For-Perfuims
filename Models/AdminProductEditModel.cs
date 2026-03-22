using System.ComponentModel.DataAnnotations;

namespace SolutanPerfumes.Models;

public class AdminProductEditModel
{
    public string? Id { get; set; }

    [Required]
    public string Name { get; set; } = "";

    public string Description { get; set; } = "";

    [Range(typeof(decimal), "0", "9999999")]
    public decimal Price { get; set; }

    public string ImageUrl { get; set; } = "";

    public Category Category { get; set; }

    public bool Featured { get; set; }
}
