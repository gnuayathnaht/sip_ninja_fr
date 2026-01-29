import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../service/employee-service';
import { Router } from '@angular/router';
import { JwtUtilsService } from '../../service/jwt-utils-service';
import { ToastService } from '../../service/toast-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  empService = inject(EmployeeService);
  router = inject(Router);
  jwtUtilsService = inject(JwtUtilsService);
  username: string | null = null;
  toastService = inject(ToastService);

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    console.log('Retrieved token:', token);
    this.username = this.jwtUtilsService.getUserNameFromToken(token || '');
    console.log('Extracted username:', this.username);
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.empService.getEmployees().subscribe((data) => {
      this.empService.setEmployees(data);
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
    this.toastService.info('You have been logged out.');
  }
}
