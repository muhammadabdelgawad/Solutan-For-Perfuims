using System.Globalization;
using SolutanPerfumes.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddHttpContextAccessor();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromDays(7);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddSingleton<IProductCatalog, ProductCatalog>();
builder.Services.AddSingleton<IOrderStore, OrderStore>();
builder.Services.AddScoped<ICartService, CartService>();

var app = builder.Build();

var ar = new CultureInfo("ar-EG");
CultureInfo.DefaultThreadCurrentCulture = ar;
CultureInfo.DefaultThreadCurrentUICulture = ar;

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseSession();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
