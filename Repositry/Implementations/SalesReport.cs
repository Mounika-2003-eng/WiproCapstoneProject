using Microsoft.EntityFrameworkCore;
using ShopeForHomeAPI.Data;
using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Repositry.Interfaces;

namespace ShopeForHomeAPI.Repositry.Implementations
{
    public class SalesReport : ISalesReport
    {
        private ApplicationDbContext _context;
        public SalesReport(ApplicationDbContext context)
        {
            _context = context;
        }
        public SalesReportDto GenerateSalesReport(DateTime fromDate, DateTime toDate)
        {
            var orders = _context.Orders
             .Where(o => o.OrderDate >= fromDate && o.OrderDate < toDate.AddDays(1))
             .Include(o => o.OrderItems)
             .ToList();


            int totalOrders = orders.Count();
            decimal totalRevenue = orders.Sum(o => o.TotalAmount);
            int totalProductsSold = orders.SelectMany(o => o.OrderItems).Sum(item => item.Quantity);

            return new SalesReportDto
            {
                FromDate = fromDate,
                ToDate = toDate,
                TotalOrders = totalOrders,
                TotalRevenue = totalRevenue,
                TotalProductsSold = totalProductsSold
            };
        }

    }
}
