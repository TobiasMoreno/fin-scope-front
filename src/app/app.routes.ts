import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/auth/pages/login/login.component').then(m => m.LoginComponent),
    title: 'Iniciar sesión',
  },
  {
    path: 'register',
    loadComponent: () => import('./core/auth/pages/register/register.component').then(m => m.RegisterComponent),
    title: 'Registrarse',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Página no encontrada',
  }
];
