import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  http = inject(HttpClient);

  login(username: string, password: string) {
    return this.http.post<{ token: string, role: string }>(`${environment.apiUrl}/api/auth/login`, { username, password });
  }

  logout() {
    return this.http.post<void>(`${environment.apiUrl}/api/auth/logout`, {});
  }
}
