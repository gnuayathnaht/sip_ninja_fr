import { Routes } from '@angular/router';
import { AuthGuard } from './common/utils/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./common/components/login/login').then(m => m.Login),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./common/components/main-layout/main-layout').then(m => m.MainLayout),
        canActivate: [AuthGuard]
    }
];
