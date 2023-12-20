import {Injectable, Injector, Type} from '@angular/core';
import {LoginModel} from "../authentication/model/login.model";
import {Observable} from "rxjs";
import {LoggedInModel} from "../authentication/model/loggedIn.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../env/env";
import {AccommodationModel} from "./model/accommodationModel";

@Injectable({
  providedIn: 'root'
})
export class AccommodationsService {

  constructor(private injector: Injector) { }
  login(data:LoginModel) : Observable<LoggedInModel> {
    let httpClient = this.injector.get<HttpClient>(HttpClient as Type<HttpClient>);
    return httpClient.post<LoggedInModel>(environment.apiHost + 'login', data);
  }

  createAccomodation(accommodation: AccommodationModel){
    let httpClient = this.injector.get<HttpClient>(HttpClient as Type<HttpClient>);
    httpClient.post<AccommodationModel>(environment.apiHost + 'accommodation/create', accommodation);
  }
}
