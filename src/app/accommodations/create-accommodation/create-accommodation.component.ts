import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccommodationModel, IntervalAndPrice} from "../model/accommodation.model";
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

  constructor(private service:AccommodationsService, private router:Router, private sanitizer:DomSanitizer, private authenticationService:AuthService) {

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

  selectedIntervalAndPrice:number;
  accommodationType: string = 'aparthotel';
  selectedAmenities: boolean[] = Array(this.amenities.length).fill(false);
  intervalsAndPrices : Array<IntervalAndPrice> = [];
  images:FileHandle[] = [];
  val: string = "1";

  interval_overlap_error = "";

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
    files: new FormControl<File[]|null>(null),
    accommodation_type: new FormControl("aparthotel"),
    price_option: new FormControl("1", [Validators.required]),
    added_intervals_and_prices: new FormControl(""),
  });

  create() {
      const selectedAmenitiesList = this.amenities
        .filter((amenity, index) => this.selectedAmenities[index]);
      const isPriceSetPerGuest:boolean = this.createAccommodationForm.value.price_option! == "2";
    //priceOption 1 for setPricePerUnit
    //priceOption 2 for setPricePerGuest
      if(this.createAccommodationForm.valid){
        const accommodation : AccommodationModel = {
          name: this.createAccommodationForm.value.name!,
          description:this.createAccommodationForm.value.description!,
          location:this.createAccommodationForm.value.address! + " " + this.createAccommodationForm.value.city!,
          minNbOfGuests:+this.createAccommodationForm.value.min_nb_guests!,
          maxNbOfGuests:+this.createAccommodationForm.value.max_nb_guests!,
          amenities: selectedAmenitiesList,
          intervalsAndPrices: this.intervalsAndPrices,
          images: this.images,
          accommodationType: this.accommodationType,
          isPriceSetPerGuest: isPriceSetPerGuest
        };
        console.log(accommodation)
        if(this.intervalsAndPrices.length > 0 && this.images.length >0) {
          const accommodationFormData = this.prepareFormData(accommodation);
          const hostEmail = this.authenticationService.getEmail();
          this.service.createAccommodation(accommodationFormData, hostEmail!).subscribe({
            next: () => {
              this.createAccommodationForm.reset();
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
    //allow for accommodation to be available for a single day
    return startDate && endDate && startDate <= endDate && startDate >= today && endDate >= today;
  }

  isDateOverlap(newInterval: IntervalAndPrice): boolean {
    return this.intervalsAndPrices.some(existingInterval => {
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

  addIntervalAndPrice() {
    this.interval_overlap_error = "";
    if (this.areDatesValid())
    {
      console.log("valid");
      const intervalAndPrice:IntervalAndPrice = {
        startDate : this.createAccommodationForm.value.start_date!.getTime(),
        endDate : this.createAccommodationForm.value.end_date!.getTime(),
        price: +this.createAccommodationForm.value.price!
      }
      if(!this.isDateOverlap(intervalAndPrice)) {
        this.intervalsAndPrices.push(intervalAndPrice);
      }
      else{
        this.interval_overlap_error = "Interval overlaps with existing interval.";
      }
    }
    else
      console.log("not valid")

    console.log(this.intervalsAndPrices);
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
    this.selectedIntervalAndPrice = +this.createAccommodationForm.get('added_intervals_and_prices')!.value!;
  }

  removeInterval(){
    this.intervalsAndPrices.splice(this.selectedIntervalAndPrice, 1);
  }
}
