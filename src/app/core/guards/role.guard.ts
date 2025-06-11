import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const authService = inject(AuthService);

  const requiredRoles = route.data['roles'] as string[];
  const currentUser = authService.currentUser;

  if (!currentUser) {
    snackBar.open('No estás autenticado', 'Cerrar', {
      duration: 3000,
    });
    router.navigate(['/auth/login']);
    return false;
  }

  if (!requiredRoles.includes(currentUser.role)) {
    snackBar.open('No tienes permisos para acceder a esta página', 'Cerrar', {
      duration: 3000,
    });
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
}; 