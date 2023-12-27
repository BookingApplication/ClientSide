import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import { GuestNavbarComponent } from './navbar/guest-navbar/guest-navbar.component';
import { HostNavbarComponent } from './navbar/host-navbar/host-navbar.component';
import { AdminNavbarComponent } from './navbar/admin-navbar/admin-navbar.component';
import {SharedModule} from "../shared/shared.module";
import {AccommodationsModule} from "../accommodations/accommodations.module";
// import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    GuestNavbarComponent,
    HostNavbarComponent,
    AdminNavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        MaterialModule,
        NgOptimizedImage,
        MatIconModule,
        MatDividerModule,
        SharedModule,
        AccommodationsModule,
        // SharedModule,
    ]
})
export class LayoutModule { }
