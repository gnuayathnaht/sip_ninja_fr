import { Component, inject, signal } from '@angular/core';
import { Employee } from '../../../model/employee.model';
import { EmployeeService } from '../../service/employee-service';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { EmployeeModal } from '../employee-modal/employee-modal';
import { EmployeeRequest } from '../../../model/employee_request.model';
import { DeleteModal } from '../delete-modal/delete-modal';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDetails } from '../employee-details/employee-details';

@Component({
  selector: 'app-employee-list',
  imports: [EmployeeModal, DeleteModal],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  empService = inject(EmployeeService);
  dialog = inject(MatDialog);
  emps = this.empService.emps;
  showEditModal = false;
  showDeleteModal = false;
  deleteEmpId = signal<number | undefined>(0);
  editEmpData = signal<Employee | null>(null);
  userRole = signal<string | null>('');
  isAdmin = false;

  ngOnInit() {
    this.userRole.set(localStorage.getItem('role'));

    if (this.userRole() === 'HR' || this.userRole() === 'Manager' || this.userRole() === 'Assistant Manager') {
      this.isAdmin = true;
    }

    this.empService.getEmployees().subscribe((data) => {
      console.log('Fetched employees:', data);
      this.empService.setEmployees(data);
      this.empService.setEmpNameRolesMap(data);
    });
  }

  onEditEmp(emp: Employee) {
    console.log('Editing employee:', emp);
    this.editEmpData.set(emp);
    this.showEditModal = true;
  }

  onDeleteEmp(empId: number | undefined) {
    console.log('Deleting employee with ID:', empId);
    this.deleteEmpId.set(empId);
    this.showDeleteModal = true;
  }

  async handleEdit(data: FormData) {
    const employeeBlob = data.get('employee');

    if (employeeBlob instanceof Blob) {
      const text = await employeeBlob.text();
      const employeeObj = JSON.parse(text);
      employeeObj.id = this.editEmpData()?.id;
      data.set('employee', new Blob([JSON.stringify(employeeObj)], { type: 'application/json' }));
      console.log(employeeObj);
    }

    console.log('handleEdit data:', data);
    this.empService.updateEmployee(data).subscribe(() => {
      this.empService.getEmployees().subscribe((emps) => {
        this.empService.setEmployees(emps);
      });
    });
  }

  handleDelete() {
    const empId = this.deleteEmpId();
    console.log('handleDelete empId:', empId);
    this.empService.deleteEmployee(empId).subscribe(() => {
      this.empService.getEmployees().subscribe((emps) => {
        this.empService.setEmployees(emps);
      });
    });
  }

  openEmployeeDialog(employee: Employee) {
    if (
      this.userRole() !== 'HR' &&
      this.userRole() !== 'Manager' &&
      this.userRole() !== 'Assistant Manager'
    ) {
      return;
    }

    if (this.showEditModal || this.showDeleteModal) {
      return;
    }

    this.dialog.open(EmployeeDetails, {
      width: '400px',
      data: employee,
    });
  }
}
