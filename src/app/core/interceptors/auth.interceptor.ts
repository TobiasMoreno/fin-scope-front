import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function AuthInterceptor(request: any, next: any) {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get token from localStorage
  const token = authService.getToken();
  
  // Clone the request and add the authorization header if token exists
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Handle the request and catch any errors
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // If we get a 401 Unauthorized response, the token might be expired
      if (error.status === 401) {
        // Clear the stored token and user data
        authService.logout();
        
        // Redirect to login page
        router.navigate(['/auth/login']);
      }
      
      return throwError(() => error);
    })
  );
}
