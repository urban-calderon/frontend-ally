import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ally-login',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterPageComponent {

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
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
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
    Validators.pattern(this.validationConfig.password.pattern),
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

        if (control.hasError('pattern')) {
          return 'La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales';
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

  sendData(): void {
    if (this.isFormValid()) {
      console.log('Datos válidos:', {
        name: this.nameControl.value,
        email: this.emailControl.value,
        password: this.passwordControl.value
      });
      // TODO: Enviar al servidor
    }
  }
}
