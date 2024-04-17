import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ManageAccountComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        ReactiveFormsModule
    ]
})
export class UserModule { }
