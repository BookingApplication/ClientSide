import {Injectable, Injector} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegistrationModel} from "./model/registration.model";
import {Observable} from "rxjs";
import {environment} from "../env/env";
import {LoginModel} from "./model/login.model";
import {UserTokenState} from "./model/userTokenState.model";
// import {ManageAccountDataModel} from "./model/manageAccountData.model";
import { Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private injector: Injector) {
  }

  register(data:RegistrationModel, registerAsGuest:boolean): Observable<RegistrationModel>{
    let httpClient = this.injector.get<HttpClient>(HttpClient as Type<HttpClient>);
    if(registerAsGuest)
      return httpClient.post<RegistrationModel>(environment.apiHost + 'guest/register', data);
    else
      return httpClient.post<RegistrationModel>(environment.apiHost + 'host/register', data);
  }

  //saljem email i pass, a dobijam name, surname, email -> eventualno prikazi u home/account-details
  login(data:LoginModel) : Observable<UserTokenState> {
    let httpClient = this.injector.get<HttpClient>(HttpClient as Type<HttpClient>);
    return httpClient.post<UserTokenState>(environment.apiHost + 'auth/login', data);
  }

    getAccountData(email: String) : Observable<RegistrationModel> {
        let httpClient = this.injector.get<HttpClient>(HttpClient as Type<HttpClient>);
        return httpClient.get<RegistrationModel>(environment.apiHost + 'account/' + email);
    }

    updateAccountData(data: RegistrationModel):Observable<RegistrationModel> {
        let httpClient = this.injector.get<HttpClient>(HttpClient as Type<HttpClient>);
        return httpClient.post<RegistrationModel>(environment.apiHost + 'account', data);
    }
}
