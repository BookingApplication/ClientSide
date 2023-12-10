import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginModel} from "../model/login.model";
import {RegistrationModel} from "../model/registration.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {LoggedInModel} from "../model/loggedIn.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(private service:AuthService, private router:Router) {
  }

  logIn() {
    if (this.loginForm.valid) {
      const loginModel: LoginModel = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      }


      this.service.login(loginModel).subscribe({
        next:(data:LoggedInModel) =>
        {
          this.router.navigate(['home']);
          localStorage.setItem('currentUser', JSON.stringify({
            name:data.name,
            surname:data.surname,
            email:data.email
          }));        },
        error:(_) => {console.log("Registration error.")}
      })

    }
  }
}
