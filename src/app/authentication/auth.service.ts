import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegistrationModel} from "./model/registration.model";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../env/env";
import {LoginModel} from "./model/login.model";
import {UserTokenState} from "./model/userTokenState.model";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
     skip: 'true',
  });

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();

 constructor(private http: HttpClient) {
   this.user$.next(this.getRole());
 }

  //saljem email i pass, a dobijam token-> eventualno iscitaj podatke iz tokena i prikazi u home/account-details
  login(data:LoginModel) : Observable<UserTokenState> {
    return this.http.post<UserTokenState>(environment.apiHost + 'auth/login', data,
      {headers: this.headers,});
  }

  logout() : Observable<string>{
    return this.http.get(environment.apiHost + "logOut", {
      responseType: 'text',
    });
  }

  getRole():any{
   if(this.isLoggedIn()){
     const accessToken:any = localStorage.getItem('user');
     const helper : JwtHelperService = new JwtHelperService();
     return helper.decodeToken(accessToken).role[0].authority;
   }
   return null;
  }

  isLoggedIn():boolean{
   return localStorage.getItem('user') != null;
  }

  setUser():void
  {
    this.user$.next(this.getRole());
  }
  register(data:RegistrationModel, registerAsGuest:boolean): Observable<RegistrationModel>{
    if(registerAsGuest)
      return this.http.post<RegistrationModel>(environment.apiHost + 'guest/register', data);
    else
      return this.http.post<RegistrationModel>(environment.apiHost + 'host/register', data);
  }

    getAccountData(email: String) : Observable<RegistrationModel> {
        return this.http.get<RegistrationModel>(environment.apiHost + 'account/' + email);
    }

    updateAccountData(data: RegistrationModel):Observable<RegistrationModel> {
        return this.http.post<RegistrationModel>(environment.apiHost + 'account', data);
    }
}
