import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsersPageComponent } from './pages/users/users.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { WeatherPageComponent } from './pages/weather/weather.component';
import { SelectedCountryComponent } from './cards/selected-country/selected-country.component';
import { TodoComponent } from './cards/todo/todo.component';
import { CountryComponent } from './cards/country/country.component';
import { WeatherComponent } from './cards/weather/weather.component';
import { AvailableHoursComponent } from './cards/available-hours/available-hours.component';
import { TimeComponent } from './cards/time/time.component';


@NgModule({
  declarations: [
    HomePageComponent,
    UsersPageComponent,
    HeaderComponent,
    SidebarComponent,
    CardComponent,
    DashboardLayoutComponent,
    WeatherPageComponent,
    SelectedCountryComponent,
    TodoComponent,
    CountryComponent,
    WeatherComponent,
    AvailableHoursComponent,
    TimeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ],
})
export class DashboardModule { }
