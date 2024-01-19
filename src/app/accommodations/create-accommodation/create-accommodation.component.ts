import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccommodationModel, Interval} from "../model/accommodation.model";
import {AuthService} from "../../authentication/auth.service";
import {Router} from "@angular/router";
import {AccommodationsService} from "../accommodations.service";
import {AccommodationDetailsComponent} from "../accommodation-details/accommodation-details.component";
import {interval, toArray} from "rxjs";
import {FileHandle} from "../model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})

export class CreateAccommodationComponent{

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

  selectedInterval:number;
  accommodationType: string = 'aparthotel';
  selectedAmenities: boolean[] = Array(this.amenities.length).fill(false);
  daysInAYear:number = 365;
  prices: Array<number> = [];
  intervals : Array<Interval> = [];
  images:FileHandle[] = [];
  val: string = "1";

  new_price_error: string = "";
  base_price_error: string = "";

  createAccommodationForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    min_nb_guests: new FormControl("", [Validators.required]),
    max_nb_guests: new FormControl("", [Validators.required]),
    start_date: new FormControl<Date | null>(null, [Validators.required]),
    end_date: new FormControl<Date | null>(null, [Validators.required]),
    base_price: new FormControl("", [Validators.required]),
    new_price: new FormControl(""),
    day_from: new FormControl(""),
    day_to: new FormControl(""),
    files: new FormControl<File[]|null>(null),
    accommodation_type: new FormControl("aparthotel"),
    price_option: new FormControl("1", [Validators.required]),
    added_intervals: new FormControl(""),
  });

  create() {
      const selectedAmenitiesList = this.amenities
        .filter((amenity, index) => this.selectedAmenities[index]);
      const isPriceSetPerGuest:boolean = this.createAccommodationForm.value.price_option! == "2";
    //registrationOption 1 for setPricePerUnit
    //registrationOption 2 for setPricePerGuest
      if(this.createAccommodationForm.valid){
        const accommodation : AccommodationModel = {
          //id: undefined,
          name: this.createAccommodationForm.value.name!,
          description:this.createAccommodationForm.value.description!,
          location:this.createAccommodationForm.value.address! + " " + this.createAccommodationForm.value.city!,
          minNbOfGuests:+this.createAccommodationForm.value.min_nb_guests!,
          maxNbOfGuests:+this.createAccommodationForm.value.max_nb_guests!,
          amenities: selectedAmenitiesList,
          intervals: this.intervals,
          images: this.images,
          prices: this.prices,
          accommodationType: this.accommodationType,
          isPriceSetPerGuest: isPriceSetPerGuest
        };
        console.log(accommodation)
        if(this.intervals.length > 0 && this.images.length >0 && this.prices.length>0) {
          // call service to create apt
          const accommodationFormData = this.prepareFormData(accommodation);
          this.service.createAccommodation(accommodationFormData).subscribe({
            next: () => {
              // this.createAccommodationForm.reset();
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

  addDate() {
    if (this.areDatesValid())
    {
      console.log("valid");
      const intervalAndPrice:Interval = {
        startDate : this.createAccommodationForm.value.start_date!.getTime(),
        endDate : this.createAccommodationForm.value.end_date!.getTime(),
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
    this.images = [];
    const files = event.target.files;
    if (files.length > 0) {
      for(let i = 0; i<files.length;i++){
        const fileHandle: FileHandle = {
          file:files[i],
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(files[i])
          )
        }
        this.images.push(fileHandle);
      }
    }
  }

  onAccommodationTypeChange() {
    this.accommodationType = this.createAccommodationForm.get('accommodation_type')!.value as string;
  }

  onSelectedIntervalChange(){
    this.selectedInterval = +this.createAccommodationForm.get('added_intervals')!.value!;
  }

  removeInterval(){
    this.intervals.splice(this.selectedInterval, 1);
  }

  setNewPrices() {
    const new_price = +this.createAccommodationForm.value.new_price!;
    const day_from = +this.createAccommodationForm.value.day_from!;
    const day_to = +this.createAccommodationForm.value.day_to!;
    const isFormValid = new_price&&day_from&&day_to && day_from<=day_to;
    if(!isFormValid)
      this.new_price_error = "All fields must be filled out. DateFrom must be less or equal to DayTo."
    else
      this.new_price_error = "";
    if(this.prices.length>0){
        for(let i = day_from; i<=day_to;i++){
          this.prices[i-1] = new_price;
      }
    }
    else {
      this.base_price_error = "base price must be set";
    }
  }

  setBasePrice() {
    const base_price  = +this.createAccommodationForm.value.base_price!;
    if(base_price)
      this.base_price_error="";
    if (this.prices.length == 0 && base_price) {
      for (let i = 0; i < this.daysInAYear; i++) {
        this.prices.push(base_price);
      }
    }

  }
}
