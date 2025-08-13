import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./core/auth/google-login/google-login.component').then(m => m.GoogleLoginComponent),
        title: 'Iniciar Sesión',
        data: { breadcrumb: 'Login' }
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/public/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard',
        data: { breadcrumb: 'Dashboard' }
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/public/profile/profile.component').then(m => m.ProfileComponent),
        title: 'Perfil',
        data: { breadcrumb: 'Perfil' }
      },
      {
        path: 'admin',
        canActivate: [roleGuard],
        data: { 
          breadcrumb: 'Administración',
          roles: ['ADMIN']
        },
        children: [
          {
            path: 'users',
            loadComponent: () => import('./pages/admin/users/users.component').then(m => m.UsersComponent),
            title: 'Usuarios',
            data: { breadcrumb: 'Usuarios' }
          },
          {
            path: 'settings',
            loadComponent: () => import('./pages/public/settings/settings.component').then(m => m.SettingsComponent),
            title: 'Configuración',
            data: { breadcrumb: 'Configuración' }
          }
        ]
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/error/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Página no encontrada',
    data: { breadcrumb: 'Página no encontrada' }
  }
];
