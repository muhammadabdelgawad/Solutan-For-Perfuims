namespace SolutanPerfumes.Models;

public class Order
{
    public Guid Id { get; set; }
    public List<OrderLine> Lines { get; set; } = [];
    public decimal Total { get; set; }
    public string CustomerName { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Address { get; set; } = "";
    public string PaymentMethod { get; set; } = "cod";
    public string Status { get; set; } = "pending";
    public DateTimeOffset CreatedAt { get; set; }
}

public class OrderLine
{
    public Product Product { get; set; } = null!;
    public int Quantity { get; set; }
}
