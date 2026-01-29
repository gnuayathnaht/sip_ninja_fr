import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { EmployeeRequest } from '../../model/employee_request.model';
import { Form } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient);
  private readonly _employees = signal<Employee[]>([]);
  emps = this._employees.asReadonly();
  empNameRolesMap = new Map<string, string>();

  setEmployees(emps: Employee[]) {
    this._employees.set(emps);
  }

  setEmpNameRolesMap(emps: Employee[]) {
    emps.forEach(emp => {
      this.empNameRolesMap.set(emp.name, emp.roles?.[0]?.name || '');
    });
  }

  clear() {
    this._employees.set([]);
  }

  getEmployees() {
    return this.http.get<Employee[]>(`${environment.apiUrl}/api/employees`);
  }

  saveEmployee(data : FormData) {
    console.log('EmployeeService saveEmployee data:', data);
    return this.http.post<void>(`${environment.apiUrl}/api/employees`, data);
  }

  updateEmployee(data: FormData) {
    return this.http.put<void>(`${environment.apiUrl}/api/employees`, data);
  }

  searchEmployeesByName(name: string) {
    return this.http.get<Employee[]>(`${environment.apiUrl}/api/employees/name_search?name=${name}`);
  }

  searchEmployeesByRole(roleId: string) {
    return this.http.get<Employee[]>(`${environment.apiUrl}/api/employees/role_search?roleId=${roleId}`);
  }

  searchEmployeesByTeam(teamId: string) {
    return this.http.get<Employee[]>(`${environment.apiUrl}/api/employees/team_search?teamId=${teamId}`);
  }

  deleteEmployee(empId: number | undefined) {
    return this.http.delete<void>(`${environment.apiUrl}/api/employees/${empId}`);
  }
  
}