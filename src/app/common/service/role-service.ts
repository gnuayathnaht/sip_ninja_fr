import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Role } from '../../model/role.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  http = inject(HttpClient);
  private readonly _roles = signal<Role[]>([]);
  roles = this._roles.asReadonly();

  setRoles(roles: Role[]) {
    this._roles.set(roles);
  }

  clear() {
    this._roles.set([]);
  }

  getRoles() {
    return this.http.get<Role[]>(`${environment.apiUrl}/api/roles`);
  }

  findRoleByName(name: string) {
    return this.http.get<Role>(`${environment.apiUrl}/api/roles/name_search?name=${name}`);
  }
}
