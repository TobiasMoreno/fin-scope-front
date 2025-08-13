import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const authService = inject(AuthService);

  const currentUser = authService.currentUser;
  const requiredRoles = route.data?.['roles'] || [];

  if (!currentUser) {
    snackBar.open('Debes iniciar sesión para acceder a esta página', 'Cerrar', {
      duration: 3000,
    });
    router.navigate(['/auth/login']);
    return false;
  }

  // Si no hay roles requeridos, permitir acceso
  if (requiredRoles.length === 0) {
    return true;
  }

  // Verificar si el usuario tiene el rol requerido
  const hasRequiredRole = requiredRoles.includes(currentUser.role);
  
  if (!hasRequiredRole) {
    snackBar.open('No tienes permisos para acceder a esta página', 'Cerrar', {
      duration: 3000,
    });
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
}; 