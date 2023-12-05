import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        MaterialModule,
        NgOptimizedImage,
      MatIconModule

    ]
})
export class LayoutModule { }
