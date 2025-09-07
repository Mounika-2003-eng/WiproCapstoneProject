import { Component } from '@angular/core';
import { SalesReportDto } from '../../Models/SalesReportDto';
import { SalesReportService } from '../../Services/sales-report-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-report-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './sales-report-component.html',
  styleUrl: './sales-report-component.css'
})
export class SalesReportComponent {
  report: SalesReportDto | null = null;
  fromDate: string = '';
  toDate: string = '';
  errorMessage: string = '';

  constructor(private reportService: SalesReportService) {}

  fetchReport(): void {
    if (!this.fromDate || !this.toDate) {
      this.errorMessage = 'Please select both dates.';
      return;
    }

    this.reportService.getSalesReport(this.fromDate, this.toDate).subscribe({
      next: data => {
        this.report = data;
        console.log(this.report);
        this.errorMessage = '';
      },
      error: err => {
        console.error('Validation errors:', err.error.errors);
        console.error('Failed to fetch report:', err);
        this.errorMessage = 'Could not fetch report. Please check the date range.';
      }
    });
  }
}
