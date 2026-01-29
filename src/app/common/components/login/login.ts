import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';
import { T } from '@angular/cdk/keycodes';
import { ToastService } from '../../service/toast-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authService = inject(AuthService);
  router = inject(Router);
  toastService = inject(ToastService);

  handleLogin(form: NgForm) {
    console.log('Login form submitted:', form.value);
    if (form.invalid) {
      return;
    }

    const { username, password } = form.value;
    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/dashboard']);
        this.toastService.success('Login successful!');
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
