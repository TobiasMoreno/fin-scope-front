import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isAuthenticated = authService.isAuthenticated();

  // Si está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
