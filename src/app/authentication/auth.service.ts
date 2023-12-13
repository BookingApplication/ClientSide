import {Injectable, Injector} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegistrationModel} from "./model/registration.model";
import {Observable} from "rxjs";
import {environment} from "../env/env";
import {LoginModel} from "./model/login.model";
import {LoggedInModel} from "./model/loggedIn.model";
import {ManageAccountDataModel} from "./model/manageAccountData.model";
import { Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private injector: Injector) {
  }

  // updateAccountData(data:ManageAccountDataModel??):Observable<RegistrationModel>??{
  //   return this.httpClient.post<??>(environment.apiHost + '', data);
  // problems fixed
  // }

  register(data:RegistrationModel, registerAsGuest:boolean): Observable<RegistrationModel>{
    let httpClient = this.injector.get<HttpClient>(HttpClient as Type<HttpClient>);
    if(registerAsGuest)
      return httpClient.post<RegistrationModel>(environment.apiHost + 'guest/register', data);
    else
      return httpClient.post<RegistrationModel>(environment.apiHost + 'host/register', data);
  }

  //saljem email i pass, a dobijam name, surname, email -> eventualno prikazi u home/account-details
  login(data:LoginModel) : Observable<LoggedInModel> {
    let httpClient = this.injector.get<HttpClient>(HttpClient as Type<HttpClient>);
    return httpClient.post<LoggedInModel>(environment.apiHost + 'login', data);
  }
}
