import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { UsersPageComponent } from './pages/users/users.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WeatherPageComponent } from './pages/weather/weather.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'weather', component: WeatherPageComponent },
      { path: 'usuarios', component: UsersPageComponent },
      { path: '**', redirectTo: 'home' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule {}
