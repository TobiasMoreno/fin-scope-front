import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { loginGuard } from './core/guards/login.guard';

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
        canActivate: [loginGuard],
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
    path: 'dashboard',
    canActivate: [authGuard, roleGuard],
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/public/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard',
        data: { breadcrumb: 'Dashboard' }
      }
    ]
  },
  {
    path: 'profile',
    canActivate: [authGuard, roleGuard],
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/public/profile/profile.component').then(m => m.ProfileComponent),
        title: 'Perfil',
        data: { breadcrumb: 'Perfil' }
      }
    ]
  },
  {
    path: 'settings',
    canActivate: [authGuard, roleGuard],
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/public/settings/settings.component').then(m => m.SettingsComponent),
        title: 'Configuración',
        data: { breadcrumb: 'Configuración' }
      }
    ]
  },
  {
    path: 'charts',
    canActivate: [authGuard, roleGuard],
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/public/charts/charts.component').then(m => m.ChartsComponent),
        title: 'Gráficos',
        data: { breadcrumb: 'Gráficos' }
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    data: { 
      breadcrumb: 'Administración'
    },
    children: [
      {
        path: 'users',
        loadComponent: () => import('./pages/admin/users/users.component').then(m => m.UsersComponent),
        title: 'Usuarios',
        data: { breadcrumb: 'Usuarios' }
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
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
