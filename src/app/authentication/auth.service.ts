import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegistrationModel} from "./model/registration.model";
import {Observable} from "rxjs";
import {environment} from "../env/env";
import {LoginModel} from "./model/login.model";
import {LoggedInModel} from "./model/loggedIn.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  register(data:RegistrationModel, registerAsGuest:boolean): Observable<RegistrationModel>{
    if(registerAsGuest)
      return this.httpClient.post<RegistrationModel>(environment.apiHost + 'guest/register', data);
    else
      return this.httpClient.post<RegistrationModel>(environment.apiHost + 'host/register', data);
  }

  //saljem email i pass, a dobijam name, surname, email -> prikazi u home/account-details
  login(data:LoginModel) : Observable<LoggedInModel> {
    return this.httpClient.post<LoggedInModel>(environment.apiHost + 'login', data);
  }
}
