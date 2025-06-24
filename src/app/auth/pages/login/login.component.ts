import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ally-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginPageComponent {

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

  sendData(): void {
    if (this.emailControl.valid && this.passwordControl.valid) {
      console.log('Datos válidos:', {
        email: this.emailControl.value,
        password: this.passwordControl.value
      });
      // TODO: enviar al servidor
    }
  }
}
