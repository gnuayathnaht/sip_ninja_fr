import { Component, inject, signal } from '@angular/core';
import { Employee } from '../../../model/employee.model';
import { Form, FormControl, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../service/employee-service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { RoleService } from '../../service/role-service';
import { TeamService } from '../../service/team-service';
import { EmployeeModal } from "../employee-modal/employee-modal";
import { EmployeeRequest } from '../../../model/employee_request.model';

@Component({
  selector: 'app-navbar',
  imports: [ReactiveFormsModule, EmployeeModal],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  nameSearchControl = new FormControl('');
  roleSearchControl = new FormControl('');
  teamSearchControl = new FormControl('');
  empService = inject(EmployeeService);
  roleService = inject(RoleService);
  teamService = inject(TeamService);
  roles = this.roleService.roles;
  teams = this.teamService.teams;
  isAdmin = false;
  showModal = false;
  userRole = signal<string | null>('');

  ngOnInit() {
    this.userRole.set(localStorage.getItem('role'));

    if (this.userRole() === 'HR' || this.userRole() === 'Manager' || this.userRole() === 'Assistant Manager') {
      this.isAdmin = true;
    }

    this.roleService.getRoles().subscribe((roles) => {
      console.log('Fetched roles:', roles);
      this.roleService.setRoles(roles);
    });

    this.teamService.getTeams().subscribe((teams) => {
      console.log('Fetched teams:', teams);
      this.teamService.setTeams(teams);
    });

    this.nameSearchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((keyword) => {
          if (!keyword || keyword.trim() === '') {
            this.empService.clear();
            return this.empService.getEmployees();
          }

          return this.empService.searchEmployeesByName(keyword);
        })
      )
      .subscribe((data) => {
        this.empService.setEmployees(data || []);
      });

    this.roleSearchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((roleId) => {
          if (!roleId) {
            this.empService.clear();
            return this.empService.getEmployees();
          }

          return this.empService.searchEmployeesByRole(roleId);
        })
      )
      .subscribe((data) => {
        this.empService.setEmployees(data || []);
      });

    this.teamSearchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((teamId) => {
          if (!teamId) {
            this.empService.clear();
            return this.empService.getEmployees();
          }

          return this.empService.searchEmployeesByTeam(teamId);
        })
      )
      .subscribe((data) => {
        console.log("team search data =", data);
        this.empService.setEmployees(data || []);
      });
  }

  handleSubmit(data: FormData) {
    console.log('handleSubmit data:', data);
    this.empService.saveEmployee(data).subscribe((savedEmp) => {
      console.log('Employee saved:', savedEmp);
      
      this.empService.getEmployees().subscribe((emps) => {
        this.empService.setEmployees(emps);
      });
    });
  }

  clearTeamSearchControl() {
    this.teamSearchControl.setValue('');
  }

  clearRoleSearchControl() {
    this.roleSearchControl.setValue('');
  }
}
