import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import {MaterialModule} from "../infrastructure/material/material.module";



@NgModule({
  declarations: [
    MapComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MapComponent,
    SnackBarComponent,
  ]
})
export class SharedModule { }
