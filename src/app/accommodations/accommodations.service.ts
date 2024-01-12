import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../env/env";
import {AccommodationWithImagesModel} from "./model/accommodation-with-images.model";
import {ImageProcessingService} from "../image-processing.service";

@Injectable({
  providedIn: 'root'
})
export class AccommodationsService {

  constructor(private http : HttpClient, private imageProcessingService:ImageProcessingService) { }

  createAccommodation(accommodation:FormData):Observable<Boolean>{
    return this.http.post<Boolean>(environment.apiHost+'accommodation/create', accommodation);
  }


  getAccommodationDetails(id: number):Observable<AccommodationWithImagesModel> {
    return this.http.get<AccommodationWithImagesModel>(environment.apiHost + 'accommodation/getDetails/' + id)
      .pipe(
        map(accommodationWithImagesModel => {
          this.imageProcessingService.createImages(accommodationWithImagesModel);
          return accommodationWithImagesModel;
        })
    )
  }


  getAllAvailableAccommodations():Observable<Set<AccommodationWithImagesModel>> {
    return this.http.get<Set<AccommodationWithImagesModel>>(environment.apiHost+'accommodation/getAllAvailable').pipe(
        map(accommodationsWithImagesModel => {
          accommodationsWithImagesModel.forEach(accommodationWithImageModel =>{
            this.imageProcessingService.createImages(accommodationWithImageModel);
          });
          return accommodationsWithImagesModel;
        })
    )
  }


}
