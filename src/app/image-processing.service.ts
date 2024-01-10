import { Injectable } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {AccommodationModel} from "./accommodations/model/accommodation.model";
import {FileHandle} from "./accommodations/model/file-handle.model";
import {AccommodationWithImagesModel, ImageModel} from "./accommodations/model/accommodation-with-images.model";

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(accommodationWithImagesModel:AccommodationWithImagesModel){

    const accommodationImages = accommodationWithImagesModel.images;
    const accommodationImagesToFileHandle: FileHandle[] = [];

    for(let i = 0; i<accommodationImages.length;i++)
    {
      const imageData:ImageModel = accommodationImages[i];

      const imageBlob = this.dataURItoBlob(imageData.imageBytes, imageData.type);
      const imageFile = new File([imageBlob], imageData.name, {type:imageData.type})

      const finalFileHandle : FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      accommodationImagesToFileHandle.push(finalFileHandle);
    }
    accommodationWithImagesModel.accommodation.images = accommodationImagesToFileHandle;
    return accommodationWithImagesModel;
  }

  public dataURItoBlob(picBytes:string, imageType:string) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType});
    return blob;
  }
}
