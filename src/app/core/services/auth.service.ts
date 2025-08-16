import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../interfaces/user.interface';
import { AuthResponse, GoogleAuthRequest } from '../interfaces/auth-response.interface';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly API_URL = 'http://localhost:8080';
  
  // Token en memoria para mayor seguridad
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  private http = inject(HttpClient);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private cookieService = inject(CookieService);

  constructor() {
    this.initializeUserFromCookies();
  }

  private initializeUserFromCookies(): void {
    const token = this.cookieService.getAuthToken();
    const userData = this.cookieService.getUserData();
    const expiry = this.cookieService.getTokenExpiry();
    
    if (token && userData && expiry) {
      try {
        const expiryTime = parseInt(expiry);
        
        // Verificar si el token no ha expirado
        if (Date.now() < expiryTime) {
          this.accessToken = token;
          this.tokenExpiry = expiryTime;
          
          const userWithToken: User = {
            ...userData,
            token: token
          };
          
          this.currentUserSubject.next(userWithToken);
        } else {
          this.clearCookies();
        }
      } catch (error) {
        this.clearCookies();
      }
    }
  }

  private clearCookies(): void {
    this.cookieService.clearAuthCookies();
    
    this.accessToken = null;
    this.tokenExpiry = null;
    this.currentUserSubject.next(null);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    // Verificar si el token ha expirado
    if (this.tokenExpiry && Date.now() >= this.tokenExpiry) {
      this.clearCookies();
      return null;
    }
    
    return this.accessToken;
  }

  loginWithGoogle(idToken: string): Observable<AuthResponse> {
    const googleAuthRequest: GoogleAuthRequest = { idToken };

    return this.http.post<AuthResponse>(`${this.API_URL}/auth/google`, googleAuthRequest)
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        tap(() => this.showSuccessMessage('Inicio de sesión con Google exitoso')),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.clearCookies();
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const authenticated = !!(this.currentUser && this.getToken());
    return authenticated;
  }

  private handleAuthResponse(response: AuthResponse): void {
    // Token expira en 1 hora
    const expiry = Date.now() + (60 * 60 * 1000);
    
    const user: User = {
      email: response.email,
      name: response.name,
      picture: response.picture,
      role: response.role,
      token: response.token
    };
    
    // Guardar en cookies usando el CookieService con nombres crípticos
    this.cookieService.setAuthToken(response.token, 1);
    this.cookieService.setUserData(user, 1);
    this.cookieService.setTokenExpiry(expiry.toString(), 1);
    
    this.accessToken = response.token;
    this.tokenExpiry = expiry;
    
    this.currentUserSubject.next(user);
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error.message || 'Error del servidor';
    }
    return throwError(() => new Error(errorMessage));
  }
}
