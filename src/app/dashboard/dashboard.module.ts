import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsersPageComponent } from './pages/users/users.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { WeatherPageComponent } from './pages/weather/weather.component';


@NgModule({
  declarations: [
    HomePageComponent,
    UsersPageComponent,
    HeaderComponent,
    SidebarComponent,
    CardComponent,
    DashboardLayoutComponent,
    WeatherPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
})
export class DashboardModule { }
