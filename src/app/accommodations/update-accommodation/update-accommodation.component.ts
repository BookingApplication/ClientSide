import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AccommodationsService} from "../accommodations.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "../../authentication/auth.service";
import {AccommodationModel, IntervalAndPrice} from "../model/accommodation.model";
import {FileHandle} from "../model/file-handle.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccommodationWithImagesModel} from "../model/accommodation-with-images.model";
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";

@Component({
  selector: 'app-update-accommodation',
  templateUrl: './update-accommodation.component.html',
  styleUrls: ['./update-accommodation.component.css']
})
export class UpdateAccommodationComponent implements OnInit{

  constructor(private service:AccommodationsService, private router:Router, private activatedRoute:ActivatedRoute,
              private sanitizer:DomSanitizer, private authenticationService:AuthService) {
  }

  accommodationId : number
  accommodationImagesModel : AccommodationWithImagesModel
  accommodation : AccommodationModel

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
  val_price: string = "1";
  val_reservation:string = "1";

  interval_overlap_error = "";

  updateAccommodationForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    location: new FormControl("", [Validators.required]),
    min_nb_guests: new FormControl("", [Validators.required]),
    max_nb_guests: new FormControl("", [Validators.required]),
    start_date: new FormControl<Date | null>(null, [Validators.required]),
    end_date: new FormControl<Date | null>(null, [Validators.required]),
    price: new FormControl("", [Validators.required]),
    files: new FormControl<File[]|null>(null),
    accommodation_type: new FormControl("aparthotel"),
    price_option: new FormControl("1", [Validators.required]),
    reservation_option: new FormControl("1", [Validators.required]),
    intervals_and_prices: new FormControl(""),
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>
    {
      this.accommodationId = +params['accommodationId']
      this.initializeData()
    })
  }


  initializeData(): void{
    this.service.getAccommodationDetails(this.accommodationId).subscribe({
      next:(model:AccommodationWithImagesModel) => {
        this.accommodationImagesModel = model
        this.accommodation = model.accommodation
        this.fillInForm()
      },
      error:(_) =>
      {
        console.log("Error getting Accommodation Data")
      }
    })
  }

  fillInForm(){
    if(!this.accommodationImagesModel)
      return
    this.updateAccommodationForm.patchValue(
      {
        name: this.accommodationImagesModel.accommodation.name,
        description: this.accommodationImagesModel.accommodation.description,
        location: this.accommodationImagesModel.accommodation.location,
        min_nb_guests: this.accommodationImagesModel.accommodation.minNbOfGuests!.toString(),
        max_nb_guests: this.accommodationImagesModel.accommodation.maxNbOfGuests!.toString(),
        accommodation_type: this.accommodationImagesModel.accommodation.accommodationType,
        intervals_and_prices: this.accommodationImagesModel.accommodation.intervalsAndPrices.toString(),
        price_option: this.accommodationImagesModel.accommodation.isPriceSetPerGuest? "2":"1",
        reservation_option: this.accommodationImagesModel.accommodation.isReservationManual? "1":"2"
      }
    )

    // this.updateAccommodationForm.get("price_option")?.setValue(this.accommodationImagesModel.accommodation.isPriceSetPerGuest? "2":"1")
    // this.updateAccommodationForm.get("reservation_option")?.setValue(this.accommodationImagesModel.accommodation.isReservationManual? "1":"2")
    this.selectedAmenities = this.amenities.map(a => this.accommodationImagesModel.accommodation.amenities.includes(a))
  }

  update() {
    const selectedAmenitiesList = this.amenities
      .filter((amenity, index) => this.selectedAmenities[index]);
    const isPriceSetPerGuest:boolean = this.updateAccommodationForm.value.price_option! == "2";
    //priceOption 1 for setPricePerUnit
    //priceOption 2 for setPricePerGuest
    if(this.updateAccommodationForm.valid){
      const accommodation : AccommodationModel = {
        name: this.updateAccommodationForm.value.name!,
        description:this.updateAccommodationForm.value.description!,
        location:this.updateAccommodationForm.value.location!,
        minNbOfGuests:+this.updateAccommodationForm.value.min_nb_guests!,
        maxNbOfGuests:+this.updateAccommodationForm.value.max_nb_guests!,
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
            this.updateAccommodationForm.reset();
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
    const startDate = this.updateAccommodationForm.value.start_date!;
    const endDate = this.updateAccommodationForm.value.end_date!;
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
        startDate : this.updateAccommodationForm.value.start_date!.getTime(),
        endDate : this.updateAccommodationForm.value.end_date!.getTime(),
        price: +this.updateAccommodationForm.value.price!
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
    this.accommodationType = this.updateAccommodationForm.get('accommodation_type')!.value as string;
  }

  onSelectedIntervalChange(){
    this.selectedIntervalAndPrice = +this.updateAccommodationForm.get('added_intervals_and_prices')!.value!;
  }

  removeInterval(){
    this.intervalsAndPrices.splice(this.selectedIntervalAndPrice, 1);
  }

}
