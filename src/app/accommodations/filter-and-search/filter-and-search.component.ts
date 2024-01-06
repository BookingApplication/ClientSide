import {Component, Input, OnInit} from '@angular/core';
import {AccommodationModel, Interval} from "../model/accommodation.model";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {isWrappedTsNodeExpr} from "@angular/compiler-cli/src/ngtsc/annotations/common";
import {elementAt} from "rxjs";

@Component({
  selector: 'app-filter-and-search',
  templateUrl: './filter-and-search.component.html',
  styleUrls: ['./filter-and-search.component.css']
})
export class FilterAndSearchComponent implements OnInit{
  ngOnInit(): void {
      console.log(this.accommodations)
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

  @Input()
  accommodations:AccommodationModel[];
  searchAccommodationsResults:AccommodationModel[] = [];
  filterAccommodationsResults:AccommodationModel[] = [];
  accommodationType:string = "aparthotel";
  selectedAmenities: boolean[] = Array(this.amenities.length).fill(false);

  amenities_error_message = "";
  price_range_error_message = "";

  filterAccommodationsForm = new FormGroup({
    price_from: new FormControl("", [Validators.required]),
    price_to: new FormControl("",[Validators.required]),
    accommodation_type: new FormControl("aparthotel")
  })

  searchAccommodationsForm = new FormGroup({
    address: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    number_of_guests: new FormControl("", [Validators.required]),
    start_date: new FormControl<Date|null>(null, [Validators.required]),
    end_date: new FormControl<Date|null>(null,[Validators.required])
  })

  searchAccommodations() {
    const address = this.searchAccommodationsForm.value.address!;
    const city = this.searchAccommodationsForm.value.city!;
    const numberOfGuests = +this.searchAccommodationsForm.value.number_of_guests!;
    const startDate = this.searchAccommodationsForm.value.start_date!;
    const endDate = this.searchAccommodationsForm.value.end_date!;
    const location = address + " " + city;

    //TODO
    // if(areDatesValid())

    for(let acccommodation of this.accommodations){
      if(acccommodation.location!.includes(location,0) &&
        acccommodation.minNbOfGuests!<=numberOfGuests &&
        numberOfGuests<=acccommodation.maxNbOfGuests!){
          this.searchAccommodationsResults.push(acccommodation);
      }
    }
  }

  onAccommodationTypeChange() {
    this.accommodationType = this.filterAccommodationsForm.get('accommodation_type')!.value as string;
  }

  //FILTRIRANJE
  //svaka funkcija za filtriranje po odredjenom parametru, prima listu smestaja nad kojom vrsi filtraciju
  //pocetna lista smestaja se dobija kao @Input od roditljske komponente home-component, koja ce je dobaviti od servera
  filterPerAmenities(accommodations:AccommodationModel[]) {
    this.filterAccommodationsResults = [];
    const selectedAmenitiesList = this.amenities
      .filter((amenity, index) => this.selectedAmenities[index]);
    if(selectedAmenitiesList.length==0)
      this.amenities_error_message="No amenities selected."
    else{
      this.amenities_error_message = "";
      for(let accommodation of accommodations){
        if(selectedAmenitiesList.some(selectedAmenity => accommodation.amenities.includes(selectedAmenity)))
          this.filterAccommodationsResults.push(accommodation);
      }
    }
    console.log("filter per ammenities ");
    console.log(this.filterAccommodationsResults);
  }

  //vraca smestaj samo sa onim intervalima cija je cena u opsegu filtera
  filterPerPriceRange(accommodations:AccommodationModel[]) {
    this.filterAccommodationsResults = [];
    const priceFrom = +this.filterAccommodationsForm.value.price_from!;
    const priceTo = +this.filterAccommodationsForm.value.price_to!;
    if(priceFrom > priceTo || priceFrom == priceTo)
      this.price_range_error_message = "Invalid input.";
    else {
      this.price_range_error_message="";
      for(let accommodation of accommodations)
      {
        const accommodationToAdd = structuredClone(accommodation);
        const intervalsInRange = this.getIntervalsInRange(accommodation.intervals,priceFrom,priceTo,accommodation.prices);
        if(intervalsInRange.length > 0)
        {
          accommodationToAdd.intervals = intervalsInRange;
          this.filterAccommodationsResults.push(accommodationToAdd);
        }
        console.log("filter per price range ")
        console.log(this.filterAccommodationsResults)
      }
    }
  }

  filterPerAccommodationType(accommodations:AccommodationModel[]) {
    this.filterAccommodationsResults = [];
    for(let accommodation of accommodations){
      if(accommodation.accommodationType == this.accommodationType)
        this.filterAccommodationsResults.push(accommodation);
    }
    console.log("filter per accommodation");
    console.log(this.filterAccommodationsResults);
  }

  //redni broj dana u godini, koristi se kao indeks za dobavljanje cena
  getDayOfYear(timestamp: number): number {
    const date = new Date(timestamp);
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const timeDifference = date.getTime() - startOfYear.getTime(); //in milliseconds
    const dayOfYear = Math.floor(timeDifference / (24 * 60 * 60 * 1000)) + 1;
    return dayOfYear;
  }

  //intervals: dostupni intervali u smestaju
  //prices: lista cena smestaja za svaki dan u godini
  //za svaki interval, dobavlja cene smestaja u datom intervalu, i proverava da li se nalaze u okviru ogranicenja definisanog filterom
  getIntervalsInRange(intervals: Array<Interval>, lowerPriceLimit:number, upperPriceLimit:number, prices:number[]) {
    const intervalsInRange: Interval[] = [];
    let inRange = true;
    for(let interval of intervals)
    {
      const startDay = this.getDayOfYear(interval.startDate!);
      const endDay = this.getDayOfYear(interval.endDate!);
      const pricesInRange = prices.slice(startDay-1, endDay);
      console.log("prices in range")
      console.log(pricesInRange)
      console.log("price", prices)
      for(let i = 0; i < pricesInRange.length; i++) {
        if (lowerPriceLimit > pricesInRange[i] || pricesInRange[i] > upperPriceLimit)
          inRange = false;
      }
      if(inRange)
        intervalsInRange.push(interval);
    }
    console.log("intervals in range: ")
    console.log(intervalsInRange)
    return intervalsInRange;
  }

  //filtriranje po svim parametrima
  //izlaz iz prethodne funkcije se koristi kao ulaz u narednu funkciju za filtriranje
  filterAll() {
    this.filterPerAccommodationType(this.accommodations);
    let filtrationPerAccommodationTypeResults = structuredClone(this.filterAccommodationsResults);
    console.log(filtrationPerAccommodationTypeResults);
    this.filterPerAmenities(filtrationPerAccommodationTypeResults);
    let filtrationPerAmenitiesResults = structuredClone(this.filterAccommodationsResults);
    console.log(filtrationPerAmenitiesResults);
    this.filterPerPriceRange(filtrationPerAmenitiesResults);
    console.log(this.filterAccommodationsResults)

    //sada se rezultat svih filtriranja nalazi u this.filterAccommodationsResults
    //output listu filtriranih za prikaz u roditelju...
  }
}
