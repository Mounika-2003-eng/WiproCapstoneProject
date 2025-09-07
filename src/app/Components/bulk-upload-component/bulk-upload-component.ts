import { Component } from '@angular/core';
import { ProductService } from '../../Services/product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bulk-upload-component',
  imports: [CommonModule],
  templateUrl: './bulk-upload-component.html',
  styleUrl: './bulk-upload-component.css'
})
export class BulkUploadComponent {
  selectedFile: File | null = null;
  uploadMessage: string = '';
  isUploading: boolean = false;

  constructor(private productService: ProductService) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadMessage = '';
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.uploadMessage = 'Please select a CSV file first.';
      return;
    }

    this.isUploading = true;
    this.productService.bulkUploadProducts(this.selectedFile).subscribe({
      next: res => {
        alert(res.message); // ✅ Show success alert
        this.uploadMessage = res.message;
        this.isUploading = false;
        this.selectedFile = null;
        // ✅ Clear file input manually
        const fileInput = document.getElementById('csvFileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: err => {
        this.uploadMessage = 'Upload failed. Please check the file format.';
        this.isUploading = false;
      }
    });
  }

  downloadTemplate(): void {
    const csvContent = `Name,Description,Price,Rating,ImageUrl,Stock,CategoryName\n`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'product-template.csv';
    link.click();
  }
}
