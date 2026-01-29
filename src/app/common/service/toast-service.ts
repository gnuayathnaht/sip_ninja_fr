import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  
  private snackbar = inject(MatSnackBar);

  success(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['toast-success'],
    });
  }

  error(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['toast-error'],
    });
  }

  info(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['toast-info'],
    });
  }
}
