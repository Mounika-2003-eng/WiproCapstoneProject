using Microsoft.AspNetCore.Mvc;
using ShopeForHomeAPI.Repositry.Interfaces;

namespace ShopeForHomeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class SalesReportController : Controller
    {
        ISalesReport _salesReport;
        public SalesReportController(ISalesReport salesreport) {
            this._salesReport=salesreport;
        
        }
        [HttpGet("sales-report")]
        public IActionResult GetSalesReport([FromQuery] DateTime fromDate, [FromQuery] DateTime toDate)
        {
            if (fromDate > toDate)
                return BadRequest(new { message = "FromDate must be earlier than ToDate." });

            var report = _salesReport.GenerateSalesReport(fromDate, toDate);
            return Ok(report);
        }

    }
}
