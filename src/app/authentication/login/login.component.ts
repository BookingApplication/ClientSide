import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginModel} from "../model/login.model";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {UserTokenState} from "../model/userTokenState.model";

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

  ngOnInit() : void {}

  logIn() {
    if (this.loginForm.valid) {
      const loginModel: LoginModel = {
        username: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      }
      this.service.login(loginModel).subscribe({
        next:(data:UserTokenState) =>
        {
          localStorage.setItem('user', data.accessToken)
          this.service.setUser();
          this.router.navigate(['home']);
          },
        error:(_) => {console.log("Registration error.")}
      })

    }
  }
}
