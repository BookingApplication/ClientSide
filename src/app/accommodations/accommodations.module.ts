import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {SharedModule} from "../shared/shared.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import {RouterLink} from "@angular/router";
import { FilterAndSearchComponent } from './filter-and-search/filter-and-search.component';
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatChipsModule} from "@angular/material/chips";
import {FullCalendarModule} from "@fullcalendar/angular";
import {MatIconModule} from "@angular/material/icon";
// import {MatNativeDateModule} from "@angular/material/core";



@NgModule({
  declarations: [
    AccommodationDetailsComponent,
    CreateAccommodationComponent,
    AccommodationCardComponent,
    FilterAndSearchComponent,
    // UpdateAccommodationComponent
  ],
  exports: [
    AccommodationCardComponent,
    FilterAndSearchComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    SharedModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    RouterLink,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule,
    FullCalendarModule,
    MatIconModule,
    // MatNativeDateModule,
  ]
})
export class AccommodationsModule { }
