import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-accomodation',
  templateUrl: './create-accomodation.component.html',
  styleUrls: ['./create-accomodation.component.css']
})
export class CreateAccomodationComponent {
  createAccomodationForm = new FormGroup({

  });

  create() {

  }
}
