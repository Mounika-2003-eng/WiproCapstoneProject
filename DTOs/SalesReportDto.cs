namespace ShopeForHomeAPI.DTOs
{
    public class SalesReportDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int TotalOrders { get; set; }
        public decimal TotalRevenue { get; set; }
        public int TotalProductsSold { get; set; }
    }

}
