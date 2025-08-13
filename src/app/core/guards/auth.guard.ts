import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }
  
  snackBar.open('Debes iniciar sesión para acceder a esta página', 'Cerrar', {
    duration: 3000,
  });
  router.navigate(['/auth/login']);
  return false;
};
