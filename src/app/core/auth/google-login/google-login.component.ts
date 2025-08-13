import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GoogleCredentialResponse, GoogleSignInConfig, GoogleButtonConfig } from '../../interfaces/google-signin.interface';

@Component({
  selector: 'app-google-login',
  imports: [],
  templateUrl: './google-login.component.html'
})
export class GoogleLoginComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  isLoading = false;
  private googleInitialized = false;

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return;
    }
    
    this.initializeGoogleSignIn();
  }

  ngOnDestroy() {
  }

  private initializeGoogleSignIn() {
    const checkGoogleLoaded = () => {
      if (typeof window.google !== 'undefined' && window.google.accounts) {
        this.setupGoogleSignIn();
      } else {
        setTimeout(checkGoogleLoaded, 100);
      }
    };
    checkGoogleLoaded();
  }

  private setupGoogleSignIn() {
    if (this.googleInitialized) return;

    const config: GoogleSignInConfig = {
      client_id: '830906165893-c7i1u8o134ej796cgoihpm9secct665m.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    };

    window.google.accounts.id.initialize(config);

    const buttonConfig: GoogleButtonConfig = {
      theme: 'outline',
      size: 'large',
      type: 'standard',
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'left',
      width: 280,
      height: 50
    };

    const buttonElement = document.getElementById('google-signin-button');
    if (buttonElement) {
      window.google.accounts.id.renderButton(buttonElement, buttonConfig);
    }

    this.googleInitialized = true;
  }

  private async handleCredentialResponse(response: GoogleCredentialResponse) {
    try {
      this.isLoading = true;
      
      const idToken = response.credential;
      
      this.authService.loginWithGoogle(idToken).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error during Google login:', error);
        }
      });
    } catch (error) {
      this.isLoading = false;
      console.error('Error processing Google response:', error);
    }
  }

  signInWithGoogle() {
    if (typeof window.google !== 'undefined' && window.google.accounts) {
      window.google.accounts.id.prompt();
    } else {
      console.error('Google Sign-In not loaded');
    }
  }
}
