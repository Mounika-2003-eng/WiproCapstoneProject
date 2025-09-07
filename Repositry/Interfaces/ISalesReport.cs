using ShopeForHomeAPI.DTOs;

namespace ShopeForHomeAPI.Repositry.Interfaces
{
    public interface ISalesReport
    {
        SalesReportDto GenerateSalesReport(DateTime fromDate, DateTime toDate);

    }
}
