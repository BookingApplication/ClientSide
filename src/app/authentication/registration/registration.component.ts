import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationModel} from "../model/registration.model";
import {MatRadioButton} from "@angular/material/radio";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  val:string = "1";

  registrationForm = new FormGroup({
    email: new FormControl("",[Validators.required]),
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
  register() {
  // console.log(this.registrationForm.value.registrationOption!["1"])
    console.log(this.registrationForm.value.registrationOption!)

    if(this.registrationForm.valid) {
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

        if (this.isPasswordValid()) {
            this.service.register(registrationModel, registerAsGuest).subscribe({
                    //ako je uspesna registracija, prebaci se na home page (mada moze i na login))
                    //moze se registrovani vratiti kao povratna vrednost, sto je najcesce slucaj sa post metodama, ali nije obavezno tako
                    next: (data) => {
                        this.router.navigate(['home'])
                        console.log(data)
                    },
                    error: (_) => {
                        console.log("Registration error.")
                    }
                }
            )
        }
    }
  }

}
