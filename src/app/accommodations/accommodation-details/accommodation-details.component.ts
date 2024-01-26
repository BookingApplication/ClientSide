import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccommodationWithImagesModel} from "../model/accommodation-with-images.model";
import {AccommodationsService} from "../accommodations.service";
import {AccommodationModel, Interval} from "../model/accommodation.model";
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit {

  protected readonly Math = Math;
  accommodationWithImagesModel: AccommodationWithImagesModel;
  accommodation:AccommodationModel;
  ReservationFormGroup = new FormGroup({
    start_date: new FormControl<Date|null>(null, [Validators.required]),
    end_date: new FormControl<Date|null>(null, [Validators.required]),
    number_of_guests: new FormControl("", [Validators.required]),
  });

  rating:number = 4.2;

  intervalInfo =  {
    startDate: -1,
    endDate: -1,
    price: -1,
    pricePerUnit: -1,
  };

  // @ts-ignore
  handleDateClick(arg) {
    const clickedDate = new Date(arg.date);
    const containingInterval = this.accommodation.intervals.find(
      interval => clickedDate>= new Date(interval.startDate!) && clickedDate<=new Date(interval.endDate!)
    );

    if(containingInterval)
    {
      this.intervalInfo["startDate"] = containingInterval.startDate!;
      this.intervalInfo["endDate"] = containingInterval.endDate!;
      this.intervalInfo["price"] = this.getPriceOnInterval(containingInterval);
      this.intervalInfo["pricePerUnit"] = this.getPriceOnInterval(containingInterval)/((containingInterval.endDate! - containingInterval.startDate!)/(1000*60*60*24))
    }
  }

  getTestElements() {
    const accommodation1: AccommodationModel = {
      id: 1,
      name: "Luxury Hotel",
      description: "Moderne Wohnung mit Dachterasse is located in Vienna, just 1.5 miles from Wien Westbahnhof Train Station and 1.7 miles from Vienna Main Train Station. This apartment provides accommodations with a terrace and free Wifi. Outdoor dining is also possible at the apartment.\n" +
        "\n" +
        "The apartment consists of 1 bedroom, a living room, a fully equipped kitchen with a dishwasher and a coffee machine, and 1 bathroom with a shower and a hair dryer. Towels and bed linen are featured in the apartment. For added privacy, the accommodation has a private entrance and soundproofing.",
      location: "Bulevar Oslobodjenja 12, Novi Sad",
      minNbOfGuests: 2,
      maxNbOfGuests: 4,
      accommodationType: "hotel",
      amenities: ["FREE_WIFI", "PARKING", "ROOM_SERVICE"],
      images: [{
        file: new File(['file content 1'], 'file1.txt', {type: 'text/plain'}),
        url: 'assets/images/img1.jpg'
      }, {
        file: new File(['file content 2'], 'file2.txt', {type: 'text/plain'}),
        url: 'assets/images/img2.jpg'
      }, {
        file: new File(['file content 1'], 'file1.txt', {type: 'text/plain'}),
        url: 'assets/images/img3.jpg'
      }, {
        file: new File(['file content 1'], 'file1.txt', {type: 'text/plain'}),
        url: 'assets/images/img4.jpg'
      }, {file: new File(['file content 1'], 'file1.txt', {type: 'text/plain'}), url: 'assets/images/img5.jpg'},],
      intervals: [
        {startDate: new Date(2024, 0, 1).getTime(), endDate: new Date(2024, 0, 5).getTime()},
        {startDate: new Date(2024, 0, 10).getTime(), endDate: new Date(2024, 0, 15).getTime()},
        {startDate: new Date(2024, 0, 20).getTime(), endDate: new Date(2024, 0, 25).getTime()},
        {startDate: new Date(2024, 0, 28).getTime(), endDate: new Date(2024, 1, 3).getTime()},
        {startDate: new Date(2024, 1, 7).getTime(), endDate: new Date(2024, 1, 14).getTime()},
        {startDate: new Date(2024, 1, 18).getTime(), endDate: new Date(2024, 1, 23).getTime()},
      ],
      prices: [33, 49, 50, 50, 48, 40, 37, 53, 58, 33, 41, 31, 35, 45, 56, 40, 48, 52, 52, 53, 45, 56, 62, 46, 32, 39,
        52, 62, 32, 50, 60, 52, 61, 32, 62, 54, 55, 31, 63, 32, 40, 49, 50, 40, 36, 45, 37, 54, 62, 40, 63, 42, 46, 55,
        41, 60, 31, 51, 52, 42, 40, 45, 46, 63, 40, 50, 49, 61, 60, 59, 57, 34, 45, 59, 32, 58, 34, 45, 41, 63, 59, 40,
        56, 61, 55, 39, 38, 45, 38, 37, 59, 42, 61, 36, 45, 46, 45, 31, 50, 63, 61, 53, 31, 58, 46, 55, 45, 52, 39, 38,
        56, 59, 58, 56, 62, 41, 46, 38, 34, 62, 55, 60, 50, 37, 40, 42, 55, 62, 50, 34, 55, 55, 39, 50, 58, 33, 45, 39,
        61, 41, 56, 57, 42, 32, 48, 32, 41, 62, 53, 55, 59, 54, 40, 34, 62, 54, 37, 59, 55, 39, 58, 37, 55, 33, 48, 62,
        36, 55, 38, 38, 57, 60, 46, 37, 41, 49, 57, 57, 47, 34, 48, 62, 37, 42, 45, 47, 55, 48, 49, 39, 61, 49, 62, 43,
        54, 50, 43, 43, 60, 59, 59, 36, 38, 50, 57, 49, 42, 34, 39, 52, 51, 47, 45, 59, 53, 60, 32, 38, 46, 41, 37, 51,
        62, 40, 33, 52, 61, 53, 56, 46, 57, 57, 43, 60, 37, 58, 59, 40, 40, 42, 46, 48, 50, 48, 45, 62, 42, 39, 41, 50,
        60, 48, 38, 41, 42, 37, 45, 46, 47, 57, 46, 59, 33, 40, 33, 47, 53, 62, 32, 55, 50, 38, 43, 45, 46, 56, 59, 34,
        47, 59, 41, 49, 50, 47, 48, 36, 37, 57, 32, 33, 50, 36, 56, 48, 50, 47, 50, 50, 55, 52, 38, 46, 54, 61, 61, 32,
        38, 62, 52, 60, 37, 55, 47, 51, 36, 32, 42, 56, 41, 32, 53, 45, 59, 46, 55, 48, 45, 61, 48, 61, 54, 48, 57, 36,
        47, 56, 42, 51, 56, 60, 47, 54, 45, 34, 57, 32, 61, 50, 61, 46, 50, 57, 55, 56, 56, 57, 38, 48, 58, 56, 56, 57,
        38, 48, 58],

      isPriceSetPerGuest: true,
    };

    const accommodation2: AccommodationModel = {
      id: 2,
      name: "Cozy Cottage",
      description: "Charming cottage for a peaceful retreat",
      location: "Mileve Maric 55, Novi Sad",
      minNbOfGuests: 1,
      maxNbOfGuests: 2,
      accommodationType: "cottage",
      amenities: ["FREE_WIFI", "PRIVATE_BATHROOM", "FREE_BREAKFAST"],
      images: [{
        file: new File(['file content 3'], 'file3.txt', {type: 'text/plain'}),
        url: 'assets/images/img3.jpg'
      }, {file: new File(['file content 4'], 'file4.txt', {type: 'text/plain'}), url: 'assets/images/img4.jpg'}],
      intervals: [
        {startDate: new Date(2024, 0, 5).getTime(), endDate: new Date(2024, 0, 8).getTime()},
        {startDate: new Date(2024, 0, 12).getTime(), endDate: new Date(2024, 0, 18).getTime()},
        {startDate: new Date(2024, 0, 22).getTime(), endDate: new Date(2024, 0, 25).getTime()},
        {startDate: new Date(2024, 1, 1).getTime(), endDate: new Date(2024, 1, 7).getTime()},
        {startDate: new Date(2024, 1, 11).getTime(), endDate: new Date(2024, 1, 15).getTime()},
        {startDate: new Date(2024, 1, 20).getTime(), endDate: new Date(2024, 1, 25).getTime()},
        {startDate: new Date(2024, 2, 1).getTime(), endDate: new Date(2024, 2, 8).getTime()},
        {startDate: new Date(2024, 2, 12).getTime(), endDate: new Date(2024, 2, 18).getTime()},
        {startDate: new Date(2024, 2, 22).getTime(), endDate: new Date(2024, 2, 28).getTime()},
        {startDate: new Date(2024, 3, 5).getTime(), endDate: new Date(2024, 3, 12).getTime()},
        {startDate: new Date(2024, 3, 17).getTime(), endDate: new Date(2024, 3, 22).getTime()},
        {startDate: new Date(2024, 3, 27).getTime(), endDate: new Date(2024, 3, 30).getTime()},
      ],
      prices: Array.from({length: 365}, (_, num) => num % 40 + 30),
      isPriceSetPerGuest: false,
    };

    return [accommodation1, accommodation2];
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private accommodationsService: AccommodationsService) {
  }

  ngOnInit(): void {
   this.activatedRoute.params.subscribe((params) => {
      const id = +params['accommodationId'];
      this.accommodationsService.getAccommodationDetails(id).subscribe({
        next: (data) => {
          this.accommodationWithImagesModel = data;
          this.accommodation = this.accommodationWithImagesModel.accommodation;
          },
        error: () => {
          console.log("Error fetching accommoation details.");
        }
      })
    });
  }

  getPriceOnInterval(interval: Interval):number {
    const startDate = this.getDayOfYear(interval.startDate!);
    const endDay = this.getDayOfYear(interval.endDate!);
    const pricesInRange = this.accommodation.prices.slice(startDate - 1, endDay);
    let price: number = 0;
    pricesInRange.forEach((num: number) => {
      price += num;
    })
    return price;
  }

  getDayOfYear(timestamp: number): number {
    const date = new Date(timestamp);
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const timeDifference = date.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(timeDifference / (24 * 60 * 60 * 1000)) + 1;
    return dayOfYear;
  }

  createReservation() {

  }
}
