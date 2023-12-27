import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccommodationModel, Interval} from "../model/accommodationModel";
import {AuthService} from "../../authentication/auth.service";
import {Router} from "@angular/router";
import {AccommodationsService} from "../accommodations.service";
import {AccommodationDetailsComponent} from "../accommodation-details/accommodation-details.component";
// import * as L from "leaflet";
// import {MapComponent} from "../../shared/map/map.component";
// import {MapService} from "../../shared/map/map.service";

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})

export class CreateAccommodationComponent {

  constructor(private service:AccommodationsService, private router:Router) {

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
  photoPaths: string[] = [];

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
          pictures: this.photoPaths,
          price:+this.createAccommodationForm.value.price!
        };
        if(this.intervals.length > 0 && this.photoPaths.length >0) {
          // call service to create apt
          this.service.createAccommodation(accommodation).subscribe({
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
      const paths: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const dataURL = e.target.result;
          paths.push(dataURL);
        };
        reader.readAsDataURL(file);
      }
      this.photoPaths = paths; //this.photoPaths.concat(paths);
    }
  }
}
