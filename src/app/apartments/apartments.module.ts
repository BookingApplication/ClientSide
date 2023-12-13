import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { CreateAccomodationComponent } from './create-accomodation/create-accomodation.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
// import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    AccommodationDetailsComponent,
    CreateAccomodationComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    // SharedModule
  ]
})
export class ApartmentsModule { }
