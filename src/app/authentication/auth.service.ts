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
    return this.http.get(environment.apiHost + "auth/logout", {
      responseType: 'text',
    });
  }

  getRole():any{
   if(this.isLoggedIn()){
     const accessToken:any = localStorage.getItem('user');
     const helper : JwtHelperService = new JwtHelperService();
     this.logToken(accessToken);
     return helper.decodeToken(accessToken).role;
   }
   return null;
  }

  logToken(token:string)
  {
      const helper : JwtHelperService = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      console.log(decodedToken);
      const id = decodedToken.Id;    //Id: 53
      const aud = decodedToken.aud;  //aud: "web"
      const exp = decodedToken.exp;  //exp: 1704722862
      const iat = decodedToken.iat;  //iat: 1704721062
      const iss = decodedToken.iss;  //iss: "team23"
      const role = decodedToken.role;//role: "ROLE_GUEST"
      const sub = decodedToken.sub;  //sub: "53myemail@gmail.com"

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

    getAccountData() : Observable<RegistrationModel> {
        return this.http.get<RegistrationModel>(environment.apiHost + 'account/get');
    }

    updateAccountData(data: RegistrationModel):Observable<RegistrationModel> {
        return this.http.post<RegistrationModel>(environment.apiHost + 'account/update', data);
    }
}
