import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../authentication/auth.service";
import {Router} from "@angular/router";
import {RegistrationModel} from "../../authentication/model/registration.model";

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent {

  accountDetailsForm = new FormGroup({
    email: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required]),
    name: new FormControl("",[Validators.required]),
    surname: new FormControl("",[Validators.required]),
    livingAddress: new FormControl("",[Validators.required]),
    telephoneNumber: new FormControl("",[Validators.required]),
  });

  constructor(private service:AuthService, private router:Router) {

  }

  ngOnInit():void{
  }

  saveChanges() {
    if (this.accountDetailsForm.valid) {
      //mozda moze da ostane registration model, jer se mogu promeniti svi podaci,
      //nije ograniceno da se ne moze promeniti email, ima komplikacija i dosta detalja na S, i Cl oko nacina implem ovoga
      const registrationModel: RegistrationModel = {
        email: this.accountDetailsForm.value.email!,
        password: this.accountDetailsForm.value.password!,
        name: this.accountDetailsForm.value.name!,
        surname: this.accountDetailsForm.value.surname!,
        livingAddress: this.accountDetailsForm.value.livingAddress!,
        telephoneNumber: this.accountDetailsForm.value.telephoneNumber!
      };

      // this.service.register(registrationModel, registerAsGuest).subscribe({
      //     next: (data) => {
      //       this.router.navigate(['home'])
      //     },
      //     error: (_) => {
      //       console.log("Registration error.")
      //     }
      //   }
      // )
    }
  }
// constructor(private router:Router) {
// }
  cancel() {
    this.router.navigate(['home']);
  }
}
