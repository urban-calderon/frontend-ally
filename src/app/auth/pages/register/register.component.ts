import { Component, inject, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ally-login',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterPageComponent {

  private authService = inject(AuthService);
  errorMessage        = signal<string | null>(null);
  private router      = inject(Router);

  private validationConfig = {
    name: {
      minLength: 3,
      maxLength: 50,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    },
    email: {
      maxLength: 100,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
      minLength: 8,
      maxLength: 20,
    }
  };

  nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.validationConfig.name.minLength),
    Validators.maxLength(this.validationConfig.name.maxLength),
    Validators.pattern(this.validationConfig.name.pattern),
  ]);

  emailControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.validationConfig.email.maxLength),
    Validators.pattern(this.validationConfig.email.pattern),
  ]);

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.validationConfig.password.minLength),
    Validators.maxLength(this.validationConfig.password.maxLength),
  ]);

  confirmPasswordControl = new FormControl('', [
    Validators.required,
    (control) => {
      if (control.value !== this.passwordControl.value) {
        return { passwordMismatch: true };
      }
      return null;
    }
  ]);

  getErrorMessage(field: 'name' | 'email' | 'password' | 'confirmPassword'): string {
    const control = this.getControl(field);

    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }

    switch (field) {
      case 'name':
        if (control.hasError('minlength')) {
          return `Mínimo ${this.validationConfig.name.minLength} caracteres`;
        }

        if (control.hasError('maxlength')) {
          return `Máximo ${this.validationConfig.name.maxLength} caracteres`;
        }

        if (control.hasError('pattern')) {
          return 'Solo se permiten letras y espacios';
        }

        break;

      case 'email':
        if (control.hasError('maxlength')) {
          return `Máximo ${this.validationConfig.email.maxLength} caracteres`;
        }

        if (control.hasError('pattern')) {
          return 'Correo electrónico no válido';
        }

        break;

      case 'password':
        if (control.hasError('minlength')) {
          return `Mínimo ${this.validationConfig.password.minLength} caracteres`;
        }

        if (control.hasError('maxlength')) {
          return `Máximo ${this.validationConfig.password.maxLength} caracteres`;
        }

        break;

      case 'confirmPassword':
        if (control.hasError('passwordMismatch')) {
          return 'Las contraseñas no coinciden';
        }
        break;
    }

    return '';
  }

  private getControl(field: string): FormControl {
    switch (field) {
      case 'name': return this.nameControl;
      case 'email': return this.emailControl;
      case 'password': return this.passwordControl;
      case 'confirmPassword': return this.confirmPasswordControl;
      default: throw new Error(`Control no encontrado para el campo: ${field}`);
    }
  }

  isFormValid(): boolean {
    return this.nameControl.valid &&
           this.emailControl.valid &&
           this.passwordControl.valid &&
           this.confirmPasswordControl.valid &&
           this.passwordControl.value === this.confirmPasswordControl.value;
  }

  private getAuthErrorMessage(error: any): string {
    if (error.includes('This email is already registered')) {
      return 'Ya existe una cuenta con este correo electrónico';
    }
    if (error.includes('String must contain at least 8 character(s)')) {
      return 'La contraseña debe ser minimo 8 caracteres';
    }
    return 'Error al registrar usuario. Por favor intente nuevamente';
  }

  sendData() {
    if (this.isFormValid()) {
      this.authService.register(this.nameControl.value!, this.passwordControl.value!, this.emailControl.value!)
      .subscribe({
        next: () => {
          alert('¡Usuario registrado exitosamente, por favor inicia sesión!');
          this.router.navigateByUrl('/auth/login')
        },
        error: (error) => {
          this.errorMessage.set(this.getAuthErrorMessage(error));
        }
      })
    }
  }
}
