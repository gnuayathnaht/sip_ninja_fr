import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    router = inject(Router);

    canActivate(): boolean {
        const isAuthenticated = !!localStorage.getItem('authToken');
        if (!isAuthenticated) {
            this.router.navigate(['/login']);
        }
        return isAuthenticated;
    }
}