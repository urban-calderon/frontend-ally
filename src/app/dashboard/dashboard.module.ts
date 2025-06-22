import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsersComponent } from './pages/users/users.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    HomePageComponent,
    UsersComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent
  ]
})
export class DashboardModule { }
