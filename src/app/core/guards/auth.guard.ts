import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }
  snackBar.open('No estás autenticado', 'Cerrar', {
    duration: 3000,
  });
  router.navigate(['/login']);
  return false;
};
