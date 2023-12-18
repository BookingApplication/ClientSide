import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccommodationsModule} from "./accommodations/accommodations.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import {LayoutModule} from "./layout/layout.module";
import {UserModule} from "./user/user.module";
import {MaterialModule} from "./infrastructure/material/material.module";
import {Interceptor} from "./authentication/interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccommodationsModule,
    AuthenticationModule,
    LayoutModule,
    UserModule,
    MatIconModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
