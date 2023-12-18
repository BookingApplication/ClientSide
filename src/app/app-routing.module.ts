import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import {RegistrationComponent} from "./authentication/registration/registration.component";
import {LoginComponent} from "./authentication/login/login.component";
import {AccommodationDetailsComponent} from "./accommodations/accommodation-details/accommodation-details.component";
import {ManageAccountComponent} from "./user/manage-account/manage-account.component";
import {CreateAccommodationComponent} from "./accommodations/create-accommodation/create-accommodation.component";

const routes: Routes = [
  {component: HomeComponent, path:"home"},
  {component: HomeComponent, path:""},
  {component: AccommodationDetailsComponent, path: "accommodation/:id"},
  {component: LoginComponent, path:"login"},
  {component: RegistrationComponent, path:"registration"},
  {component: ManageAccountComponent, path:"manage-account"},
  {component: AccommodationDetailsComponent, path: "accommodation-details"},
  {component: CreateAccommodationComponent, path: "create-accommodation"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
