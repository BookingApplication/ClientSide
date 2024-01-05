import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccommodationModel, Interval} from "../model/accommodation.model";
import {AuthService} from "../../authentication/auth.service";
import {Router} from "@angular/router";
import {AccommodationsService} from "../accommodations.service";
import {AccommodationDetailsComponent} from "../accommodation-details/accommodation-details.component";
import {interval, toArray} from "rxjs";
import {FileHandle} from "../model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
// import * as L from "leaflet";
// import {MapComponent} from "../../shared/map/map.component";
// import {MapService} from "../../shared/map/map.service";

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})

export class CreateAccommodationComponent {

  constructor(private service:AccommodationsService, private router:Router, private sanitizer:DomSanitizer) {

  }

  amenities : string[] = [
    "FREE_WIFI",
    "PARKING",
    "ROOM_SERVICE",
    "SWIMMING_POOL",
    "BUSINESS_CENTER",
    "AIR_CONDITIONING",
    "FLAT_SCREEN_TV",
    "HAIR_DRYER",
    "PRIVATE_BATHROOM",
    "LUGGAGE_STORAGE",
    "SAFE_DEPOSIT_BOX",
    "LAUNDRY_SERVICES",
    "FREE_TOILETRIES",
    "FREE_BREAKFAST",
  ];
  selectedAmenities: boolean[] = Array(this.amenities.length).fill(false);
  intervals : Array<Interval> = [];
  images:FileHandle[] = [];

  createAccommodationForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    min_nb_guests: new FormControl("", [Validators.required]),
    max_nb_guests: new FormControl("", [Validators.required]),
    start_date: new FormControl<Date | null>(null, [Validators.required]),
    end_date: new FormControl<Date | null>(null, [Validators.required]),
    price: new FormControl("", [Validators.required]),
    files: new FormControl<File[]|null>(null)
  });

  create() {
      const selectedAmenitiesList = this.amenities
        .filter((amenity, index) => this.selectedAmenities[index]);
      if(this.createAccommodationForm.valid){
        const accommodation : AccommodationModel = {
          name: this.createAccommodationForm.value.name!,
          description:this.createAccommodationForm.value.description!,
          location:this.createAccommodationForm.value.address! + " " + this.createAccommodationForm.value.city!,
          minNbOfGuests:+this.createAccommodationForm.value.min_nb_guests!,
          maxNbOfGuests:+this.createAccommodationForm.value.max_nb_guests!,
          amenities: selectedAmenitiesList,
          intervals: this.intervals,
          images: this.images,
          price:+this.createAccommodationForm.value.price!
        };
        if(this.intervals.length > 0 && this.images.length >0) {
          // call service to create apt
          const accommodationFormData = this.prepareFormData(accommodation);
          this.service.createAccommodation(accommodationFormData).subscribe({
            next: () => {
              this.router.navigate(['home'])
              console.log("create accommodation success.")
            },
            error: (_) => {
              console.log("Accommodation creation error.")
            }
          })
        }
        else {
          console.log("not valid");
        }
      }
    }

    prepareFormData(accommodation:AccommodationModel):FormData{
      const formData = new FormData();
      formData.append(
        'accommodation',
        new Blob([JSON.stringify(accommodation)], {type: 'application/json'})
      );

      for(let i = 0; i<accommodation.images.length; i++){
        formData.append(
          'imageFile',
          accommodation.images[i].file,
          accommodation.images[i].file.name
        )
      }
      return formData;
    }

  areDatesValid(): boolean {
    const startDate = this.createAccommodationForm.value.start_date!;
    const endDate = this.createAccommodationForm.value.end_date!;
    const today = new Date();

    return startDate && endDate && startDate < endDate && startDate > today && endDate > today;
  }

  isDateOverlap(newInterval: Interval): boolean {
    return this.intervals.some(existingInterval => {
      if (
        newInterval.startDate &&
        newInterval.endDate &&
        existingInterval.startDate &&
        existingInterval.endDate &&
        (
          (newInterval.startDate >= existingInterval.startDate && newInterval.startDate <= existingInterval.endDate) ||
          (newInterval.endDate >= existingInterval.startDate && newInterval.endDate <= existingInterval.endDate) ||
          (newInterval.startDate <= existingInterval.startDate && newInterval.endDate >= existingInterval.endDate)
        )
      ) {
        return true; // Overlap
      }
      return false; // No overlap
    });
  }

  addDateAndPrice() {
    if (this.areDatesValid())
    {
      console.log("valid");
      const intervalAndPrice:Interval = {
        startDate : this.createAccommodationForm.value.start_date!.getTime(),
        endDate : this.createAccommodationForm.value.end_date!.getTime(),
        // price : +this.createAccommodationForm.value.price!
      }
      if(!this.isDateOverlap(intervalAndPrice)) {
        this.intervals.push(intervalAndPrice);
      }
    }
    else
      console.log("not valid")

    console.log(this.intervals);
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      for(let i = 0; i<files.length;i++){
        const fileHandle: FileHandle = {
          file:files[i],
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(files[i]) //create url from my file
          )
        }

        this.images.push(fileHandle);
      }
    }
  }
}
