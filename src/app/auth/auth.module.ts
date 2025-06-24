import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPageComponent } from './pages/login/login.component';
import { RegisterPageComponent } from './pages/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
