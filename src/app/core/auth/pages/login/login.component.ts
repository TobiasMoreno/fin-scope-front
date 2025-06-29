import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from "../../../../shared/components/button/button.component";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  eyeIconUrl = 'img/Vector.svg';
  showPassword = false;
  isLoading = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.getRawValue();
      console.log('Login data:', formValue);
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.eyeIconUrl = this.showPassword ? '/img/eye.svg' : '/img/Vector.svg';
  }
}
