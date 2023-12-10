import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
    imports: [
        CommonModule,
        MatInputModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatRadioModule
    ]
})
export class AuthenticationModule { }
