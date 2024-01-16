import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationModel} from "../model/registration.model";
import {MatRadioButton} from "@angular/material/radio";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  val:string = "1";
  registration_form_error_message: string = "";
  telephone_number_error:string = "";
  address_error:string = "";
  password_error:string = "";
  email_error:string="";

  registrationForm = new FormGroup({
    email: new FormControl("",[Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required]),
    confirmPassword: new FormControl("",[Validators.required]),
    name: new FormControl("",[Validators.required]),
    surname: new FormControl("",[Validators.required]),
    livingAddress: new FormControl("",[Validators.required]),
    telephoneNumber: new FormControl("",[Validators.required]),
    registrationOption:new FormControl("1", [Validators.required])
  });

constructor(private service:AuthService, private router: Router) {
}

ngOnInit():void{
}
    isPasswordValid(): boolean {
        const password = this.registrationForm.value.password!;
        const confirmPassword = this.registrationForm.value.confirmPassword!;
        return password == confirmPassword;
    }

    addressContainsStringAndNumber():boolean{
        const address = this.registrationForm.value.livingAddress!;
        const containsString = /[a-zA-Z]/.test(address);
        const containsNumber = /\d/.test(address);

        if (!containsString || !containsNumber) {
            return false;
        }
        return true;
    }

    phoneOnlyContainsNumbers():boolean{
        const telephoneNumber = this.registrationForm.value.telephoneNumber!.trim();
        return /^\d+$/.test(telephoneNumber);
    }

    isEmailFormatValid():boolean{
      const email = this.registrationForm.value.email!.trim();
      return /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

  register() {
    console.log(this.registrationForm.value.registrationOption!)
    if(!this.addressContainsStringAndNumber())
      this.address_error = "Address must contain both a street name and a number.";
    else
      this.address_error = "";
    if(!this.phoneOnlyContainsNumbers())
      this.telephone_number_error = "Phone can only contain numbers";
    else
      this.telephone_number_error = "";
    if(!this.isPasswordValid())
      this.password_error = "Passwords must match";
    else
      this.password_error = "";
    if(!this.isEmailFormatValid())
      this.email_error = "Please enter a valid email";
    else
      this.email_error = "";

    if(this.registrationForm.valid && this.phoneOnlyContainsNumbers() && this.addressContainsStringAndNumber()
      && this.isEmailFormatValid() && this.isPasswordValid()) {
      this.registration_form_error_message = "";
      const registrationModel: RegistrationModel = {
        email: this.registrationForm.value.email!,
        password: this.registrationForm.value.password!,
        name: this.registrationForm.value.name!,
        surname: this.registrationForm.value.surname!,
        livingAddress: this.registrationForm.value.livingAddress!,
        telephoneNumber: this.registrationForm.value.telephoneNumber!,
      };
      const registerAsGuest: boolean = this.registrationForm.value.registrationOption! == "1";
      //registrationOption 1 for registerAsGuest
      //registrationOption 2 for registerAsHost

      this.service.register(registrationModel, registerAsGuest).subscribe({
          next: (data) => {
            this.router.navigate(['home'])
            console.log(data)
          },
          error: (_) => {
            console.log("Registration error.") //email already exists/unable to send verification mail
          }
        }
      )

    }
    else
      this.registration_form_error_message = "All fields must be filled in correctly.";
  }
}
