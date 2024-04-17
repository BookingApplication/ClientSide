import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccommodationWithImagesModel} from "../model/accommodation-with-images.model";
import {AccommodationsService} from "../accommodations.service";
import {AccommodationModel, IntervalAndPrice} from "../model/accommodation.model";
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
    const containingInterval = this.accommodation.intervalsAndPrices.find(
      interval => clickedDate>= new Date(interval.startDate!) && clickedDate<=new Date(interval.endDate!)
    );

    if(containingInterval)
    {
      this.intervalInfo["startDate"] = containingInterval.startDate!;
      this.intervalInfo["endDate"] = containingInterval.endDate!;
      this.intervalInfo["price"] = containingInterval.price!;
      this.intervalInfo["pricePerUnit"] = containingInterval.price!/((containingInterval.endDate! - containingInterval.startDate!)/(1000*60*60*24))
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
      intervalsAndPrices: [
        {startDate: new Date(2024, 0, 1).getTime(), endDate: new Date(2024, 0, 5).getTime(),price:55},
        {startDate: new Date(2024, 0, 10).getTime(), endDate: new Date(2024, 0, 15).getTime(),price:55},
        {startDate: new Date(2024, 0, 20).getTime(), endDate: new Date(2024, 0, 25).getTime(),price:55},
        {startDate: new Date(2024, 0, 28).getTime(), endDate: new Date(2024, 1, 3).getTime(),price:55},
        {startDate: new Date(2024, 1, 7).getTime(), endDate: new Date(2024, 1, 14).getTime(),price:55},
        {startDate: new Date(2024, 1, 18).getTime(), endDate: new Date(2024, 1, 23).getTime(),price:55},
      ],
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
      intervalsAndPrices: [
        {startDate: new Date(2024, 0, 5).getTime(), endDate: new Date(2024, 0, 8).getTime(),price:55},
        {startDate: new Date(2024, 0, 12).getTime(), endDate: new Date(2024, 0, 18).getTime(),price:55},
        {startDate: new Date(2024, 0, 22).getTime(), endDate: new Date(2024, 0, 25).getTime(),price:55},
        {startDate: new Date(2024, 1, 1).getTime(), endDate: new Date(2024, 1, 7).getTime(),price:55},
        {startDate: new Date(2024, 1, 11).getTime(), endDate: new Date(2024, 1, 15).getTime(),price:55},
        {startDate: new Date(2024, 1, 20).getTime(), endDate: new Date(2024, 1, 25).getTime(),price:55},
        {startDate: new Date(2024, 2, 1).getTime(), endDate: new Date(2024, 2, 8).getTime(),price:55},
        {startDate: new Date(2024, 2, 12).getTime(), endDate: new Date(2024, 2, 18).getTime(),price:55},
        {startDate: new Date(2024, 2, 22).getTime(), endDate: new Date(2024, 2, 28).getTime(),price:55},
        {startDate: new Date(2024, 3, 5).getTime(), endDate: new Date(2024, 3, 12).getTime(),price:55},
        {startDate: new Date(2024, 3, 17).getTime(), endDate: new Date(2024, 3, 22).getTime(),price:55},
        {startDate: new Date(2024, 3, 27).getTime(), endDate: new Date(2024, 3, 30).getTime(),price:55},
      ],
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
          console.log("Error fetching accommodation details.");
        }
      })
    });
  }

  createReservation() {

  }
}
