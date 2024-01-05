import {Injectable, Injector, Type} from '@angular/core';
import {LoginModel} from "../authentication/model/login.model";
import {Observable} from "rxjs";
import {UserTokenState} from "../authentication/model/userTokenState.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../env/env";
import {AccommodationModel} from "./model/accommodation.model";
import {Form} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AccommodationsService {

  constructor(private injector: Injector) { }

  createAccommodation(accommodation:FormData):Observable<Boolean>{
    let httpClient: HttpClient = this.injector.get<HttpClient>(HttpClient as Type<HttpClient>);
    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'multipart/form-data')
    return httpClient.post<Boolean>(environment.apiHost+'accommodation/create', accommodation, {headers});
  }

  getAccommodation(id: number):Observable<AccommodationModel> {
    let httpClient: HttpClient = this.injector.get<HttpClient>(HttpClient as Type<HttpClient>);
    return httpClient.get<AccommodationModel>(environment.apiHost+'accommodation/getdetails'+ id);

  }
}
