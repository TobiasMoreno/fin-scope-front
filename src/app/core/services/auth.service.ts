import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../interfaces/user.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { LoginRequest } from '../interfaces/login-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly API_URL = 'http://localhost:8080';

  private http = inject(HttpClient);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor() {
    // Initialize user from localStorage if exists
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  loginWithEmail(email: string, password: string, role: string = 'ADMIN'): Observable<AuthResponse> {
    const loginData: LoginRequest = {
      email,
      password,
      role
    };

    return this.http.post<AuthResponse>(`${this.API_URL}/auth/email-login`, loginData)
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        tap(() => this.showSuccessMessage('Inicio de sesión exitoso')),
        catchError(this.handleError)
      );
  }

  loginWithGoogle(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.API_URL}/auth/google-login`)
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        tap(() => this.showSuccessMessage('Inicio de sesión con Google exitoso')),
        catchError(this.handleError)
      );
  }

  register(email: string, password: string, role: string = 'ADMIN'): Observable<AuthResponse> {
    const registerData: LoginRequest = {
      email,
      password,
      role
    };

    return this.http.post<AuthResponse>(`${this.API_URL}/auth/email-register`, registerData)
      .pipe(
        tap(response => {
          this.handleAuthResponse(response);
          this.showSuccessMessage('Registro exitoso');
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
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
