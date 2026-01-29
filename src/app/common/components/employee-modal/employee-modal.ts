import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { RoleService } from '../../service/role-service';
import { TeamService } from '../../service/team-service';
import { Employee } from '../../../model/employee.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { EmployeeService } from '../../service/employee-service';
import { ROLE_CONSTANT } from '../../constants/role_constant';
import { Role } from '../../../model/role.model';
import { EmployeeRequest } from '../../../model/employee_request.model';

@Component({
  selector: 'app-employee-modal',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './employee-modal.html',
  styleUrl: './employee-modal.css',
})
export class EmployeeModal {
  @Input() isOpen = false;
  @Input() isEdit = false;
  @Input() empData!: Employee | null;
  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<FormData>();
  form!: FormGroup;
  fb = inject(FormBuilder);
  empService = inject(EmployeeService);
  roleService = inject(RoleService);
  teamService = inject(TeamService);
  roles = this.roleService.roles;
  teams = this.teamService.teams;
  selectedImageFile: File | null = null;

  ngOnInit() {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[A-Za-z ]+$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.email]],
      teamId: [''],
      roleId: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      address: ['', Validators.required],
    });

    console.log('isEdit =', this.isEdit);
    console.log('empData =', this.empData);

    this.roleService.getRoles().subscribe((roles) => {
      console.log('Fetched roles:', roles);
      this.roleService.setRoles(roles);
    });

    this.teamService.getTeams().subscribe((teams) => {
      console.log('Fetched teams:', teams);
      this.teamService.setTeams(teams);
    });

    this.form
      .get('teamId')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((data) => {
        console.log('team search data =', data);
        const empNameRolesMap = this.empService.empNameRolesMap;
        console.log('empNameRolesMap =', empNameRolesMap);
        const role = empNameRolesMap.get(data || '');
        console.log('mapped role =', role);
        if (role) {
          if (role === 'Team Lead') {
            this.roleService
              .findRoleByName('Senior Developer')
              .subscribe((senior) => {
                this.roleService
                  .findRoleByName('Junior Developer')
                  .subscribe((junior) => {
                    const roles: Role[] = [senior, junior];
                    this.roleService.setRoles(roles);
                  });
              });
          } else if (role === 'Design Team Lead') {
            this.roleService
              .findRoleByName('Senior Designer')
              .subscribe((seniorDesigner) => {
                this.roleService
                  .findRoleByName('Junior Designer')
                  .subscribe((juniorDesigner) => {
                    const roles: Role[] = [seniorDesigner, juniorDesigner];
                    this.roleService.setRoles(roles);
                  });
              });
          }
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['empData'] && this.empData) {
      this.form.patchValue({
        name: this.empData.name,
        email: this.empData.email,
        password: this.empData.password,
        teamId: this.empData.teams.length > 0 ? this.empData.teams[0].id : '',
        roleId: this.empData.roles.length > 0 ? this.empData.roles[0].id : '',
        phone: this.empData.phoneNo,
        address: this.empData.address,
      });
    }
  }

  onFileChange(event: any) {
    this.selectedImageFile = event.target.files[0];
  }

  close() {
    this.closed.emit();
    this.form.reset({
      name: '',
      email: '',
      teamId: '',
      roleId: '',
      phone: '',
      address: '',
    });
  }

  submit() {
    console.log('submit clicked');
    if (this.form.valid) {
      let formValue = this.form.value;
      let employee = {
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        phone: formValue.phone,
        address: formValue.address,
        status: true,
        roleId: formValue.roleId,
        teamId: formValue.teamId,
      };

      const formData = new FormData();
      formData.append(
        'employee',
        new Blob([JSON.stringify(employee)], { type: 'application/json' }),
      );
      if (this.selectedImageFile) {
        formData.append('image', this.selectedImageFile);
      }

      console.log('formData to submit:', formData);
      this.submitted.emit(formData);
      this.close();
      this.form.reset();
    } else {
      console.log('invalid form');
    }
  }
}
