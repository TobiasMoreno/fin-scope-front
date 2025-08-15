import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const authService = inject(AuthService);

  const currentUser = authService.currentUser;
  const currentPath = route.routeConfig?.path || '';

  if (!currentUser) {
    snackBar.open('Debes iniciar sesión para acceder a esta página', 'Cerrar', {
      duration: 3000,
    });
    router.navigate(['/auth/login']);
    return false;
  }

  const userRole = currentUser.role || 'ROLE_DEFAULT';

  // ROLE_ADMIN puede acceder a todas las rutas
  if (userRole === 'ROLE_ADMIN') {
    return true;
  }

  // ROLE_PREMIUM no puede acceder a rutas que contengan 'admin'
  if (userRole === 'ROLE_PREMIUM') {
    if (currentPath === 'admin') {
      snackBar.open('No tienes permisos para acceder a esta página', 'Cerrar', {
        duration: 3000,
      });
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  // ROLE_DEFAULT no puede acceder a rutas que contengan 'admin' ni 'charts'
  if (userRole === 'ROLE_DEFAULT') {
    if (currentPath === 'admin' || currentPath === 'charts') {
      snackBar.open('No tienes permisos para acceder a esta página', 'Cerrar', {
        duration: 3000,
      });
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  // Para cualquier otro rol, denegar acceso
  snackBar.open('No tienes permisos para acceder a esta página', 'Cerrar', {
    duration: 3000,
  });
  router.navigate(['/dashboard']);
  return false;
}; 