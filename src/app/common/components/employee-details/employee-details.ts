import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../../model/employee.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-details',
  imports: [MatDividerModule,
    MatButtonModule, MatDialogContent, MatDialogActions, MatIconModule, MatDialogClose],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails {
  constructor(@Inject(MAT_DIALOG_DATA) public employee: Employee, private dialogRef: MatDialogRef<EmployeeDetails>) {}

  ngOnInit() {
    console.log('Employee details:', this.employee);
  }

  onClose() {
    this.dialogRef.close();
  }

}
