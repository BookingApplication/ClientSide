import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ApartmentsModule} from "./apartments/apartments.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import {LayoutModule} from "./layout/layout.module";
import {UserModule} from "./user/user.module";
import {MaterialModule} from "./infrastructure/material/material.module";
// import {Interceptor} from "./authentication/interceptor";
// import {HTTP_INTERCEPTORS} from "@angular/common/http";
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from "@angular/material/form-field";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApartmentsModule,
    AuthenticationModule,
    LayoutModule,
    UserModule,
    MatIconModule,
    MaterialModule,
    HttpClientModule
    // MatFormFieldModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: Interceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
