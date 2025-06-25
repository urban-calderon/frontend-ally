import { Component, inject, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ally-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginPageComponent {

  private authService = inject(AuthService);
  errorMessage        = signal<string | null>(null);
  private router      = inject(Router);

  private validationConfig = {
    email: {
      maxLength: 100,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
      minLength: 8,
      maxLength: 20
    }
  };

  emailControl = new FormControl('jhon@email.com', [
    Validators.required,
    Validators.maxLength(this.validationConfig.email.maxLength),
    Validators.pattern(this.validationConfig.email.pattern),
  ]);

  passwordControl = new FormControl('passworD123', [
    Validators.required,
    Validators.minLength(this.validationConfig.password.minLength),
    Validators.maxLength(this.validationConfig.password.maxLength),
  ]);

  getErrorMessage(field: 'email' | 'password'): string {

    const control = field === 'email' ? this.emailControl : this.passwordControl

    if (control.hasError('required')) {
      return 'Este campo es obligatorio'
    }

    if (field === 'email') {
      if (control.hasError('maxlength')) {
        return `Máximo ${this.validationConfig.email.maxLength} caracteres`;
      }
      if (control.hasError('pattern')) {
        return 'Correo electrónico no válido';
      }
    }

    if (field === 'password') {
      if (control.hasError('minlength')) {
        return `Mínimo ${this.validationConfig.password.minLength} caracteres`;
      }
      if (control.hasError('maxlength')) {
        return `Máximo ${this.validationConfig.password.maxLength} caracteres`;
      }
    }

    return '';
  }

  private getAuthErrorMessage(error: any): string {
    if (error.includes('Email not exist')) {
      return 'No existe una cuenta con este correo electrónico';
    }
    if (error.includes('Password invalid')) {
      return 'Contraseña incorrecta';
    }
    return 'Error al iniciar sesión. Por favor intente nuevamente';
  }

  login() {
    this.errorMessage.set(null);

    if (this.emailControl.valid && this.passwordControl.valid) {
      this.authService.login(this.emailControl.value!, this.passwordControl.value!)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (error) => {
          this.errorMessage.set(this.getAuthErrorMessage(error));
        }
      });
    } else {
      this.errorMessage.set('Por favor complete el formulario correctamente');
    }
  }

}
