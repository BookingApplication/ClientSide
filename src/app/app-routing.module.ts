import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import {RegistrationComponent} from "./authentication/registration/registration.component";
import {LoginComponent} from "./authentication/login/login.component";
import {AccommodationDetailsComponent} from "./apartments/accommodation-details/accommodation-details.component";

const routes: Routes = [
  {component: HomeComponent, path:"home"},
  {component: HomeComponent, path:""},
  {component: AccommodationDetailsComponent, path: "accommodation/:id"},
  {component: LoginComponent, path:"login"},
  {component: RegistrationComponent, path:"registration"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
