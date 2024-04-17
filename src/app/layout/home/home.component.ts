import {Component, OnInit} from '@angular/core';
import {AccommodationModel} from "../../accommodations/model/accommodation.model";
import {DomUtil} from "leaflet";
import get = DomUtil.get;
import {AuthService} from "../../authentication/auth.service";
import {AccommodationsService} from "../../accommodations/accommodations.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  title:string = "Accommodations";
  accommodations:AccommodationModel[] = [];

  constructor(private service:AccommodationsService){
  }


   getTestElements()
   {
     const accommodation1: AccommodationModel = {
       id:1,
       name: "Luxury Hotel",
       description: "5-star hotel with amazing amenities",
       location: "123 Main Street, Cityville",
       minNbOfGuests: 2,
       maxNbOfGuests: 4,
       accommodationType: "hotel",
       amenities: ["FREE_WIFI", "PARKING", "ROOM_SERVICE"],
       images: [{file:new File(['file content 1'], 'file1.txt', { type: 'text/plain' }), url:'assets/images/img1.jpg'},{file:new File(['file content 2'], 'file2.txt', { type: 'text/plain' }), url:'assets/images/img2.jpg'}],
       intervalsAndPrices: [
         { startDate: new Date(2024, 0, 1).getTime(), endDate: new Date(2024, 0, 5).getTime()  , price:80 },
         { startDate: new Date(2024, 0, 10).getTime(), endDate: new Date(2024, 0, 15).getTime(), price:80 },
         { startDate: new Date(2024, 0, 20).getTime(), endDate: new Date(2024, 0, 25).getTime(), price:80 },
         { startDate: new Date(2024, 0, 28).getTime(), endDate: new Date(2024, 1, 3).getTime() , price:80 },
         { startDate: new Date(2024, 1, 7).getTime(), endDate: new Date(2024, 1, 14).getTime() , price:80 },
         { startDate: new Date(2024, 1, 18).getTime(), endDate: new Date(2024, 1, 23).getTime(), price:80 },
         { startDate: new Date(2024, 1, 28).getTime(), endDate: new Date(2024, 2, 4).getTime() , price:80 },
         { startDate: new Date(2024, 2, 8).getTime(), endDate: new Date(2024, 2, 15).getTime() , price:80 },
         { startDate: new Date(2024, 2, 18).getTime(), endDate: new Date(2024, 2, 25).getTime(), price:80 },
         { startDate: new Date(2024, 2, 28).getTime(), endDate: new Date(2024, 2, 31).getTime(), price:80 },
         { startDate: new Date(2024, 2, 4).getTime(), endDate: new Date(2024, 2, 11).getTime() , price:80 },
         { startDate: new Date(2024, 2, 15).getTime(), endDate: new Date(2024, 2, 22).getTime(), price:80 },
         { startDate: new Date(2024, 2, 25).getTime(), endDate: new Date(2024, 2, 30).getTime(), price:80 },
         { startDate: new Date(2024, 2, 5).getTime(), endDate: new Date(2024, 2, 12).getTime() , price:80 },
         { startDate: new Date(2024, 2, 16).getTime(), endDate: new Date(2024, 2, 23).getTime(), price:80 },
         { startDate: new Date(2024, 2, 26).getTime(), endDate: new Date(2024, 2, 31).getTime(), price:80 },
         { startDate: new Date(2024, 2, 1).getTime(), endDate: new Date(2024, 2, 7).getTime()  , price:80 }
       ],
       isPriceSetPerGuest: true,
     };

     const accommodation2: AccommodationModel = {
       id:2,
       name: "Cozy Cottage",
       description: "Charming cottage for a peaceful retreat",
       location: "456 Oak Street, Villageland",
       minNbOfGuests: 1,
       maxNbOfGuests: 2,
       accommodationType: "cottage",
       amenities: ["FREE_WIFI", "PRIVATE_BATHROOM", "FREE_BREAKFAST"],
       images: [{file:new File(['file content 3'], 'file3.txt', { type: 'text/plain' }), url:'assets/images/img3.jpg'},{file:new File(['file content 4'], 'file4.txt', { type: 'text/plain' }), url:'assets/images/img4.jpg'}],
       intervalsAndPrices: [
         { startDate: new Date(2024, 0, 5).getTime(), endDate: new Date(2024, 0, 8).getTime()  , price:53 },
         { startDate: new Date(2024, 0, 12).getTime(), endDate: new Date(2024, 0, 18).getTime(), price:53 },
         { startDate: new Date(2024, 0, 22).getTime(), endDate: new Date(2024, 0, 25).getTime(), price:53 },
         { startDate: new Date(2024, 1, 1).getTime(), endDate: new Date(2024, 1, 7).getTime()  , price:53 },
         { startDate: new Date(2024, 1, 11).getTime(), endDate: new Date(2024, 1, 15).getTime(), price:53 },
         { startDate: new Date(2024, 1, 20).getTime(), endDate: new Date(2024, 1, 25).getTime(), price:53 },
         { startDate: new Date(2024, 2, 1).getTime(), endDate: new Date(2024, 2, 8).getTime()  , price:53 },
         { startDate: new Date(2024, 2, 12).getTime(), endDate: new Date(2024, 2, 18).getTime(), price:53 },
         { startDate: new Date(2024, 2, 22).getTime(), endDate: new Date(2024, 2, 28).getTime(), price:53 },
         { startDate: new Date(2024, 3, 5).getTime(), endDate: new Date(2024, 3, 12).getTime() , price:53 },
         { startDate: new Date(2024, 3, 17).getTime(), endDate: new Date(2024, 3, 22).getTime(), price:53 },
         { startDate: new Date(2024, 3, 27).getTime(), endDate: new Date(2024, 3, 30).getTime(), price:53 },
       ],
       isPriceSetPerGuest: false,
     };

     const accommodation3: AccommodationModel = {
       id:3,
       name: "Budget Motel",
       description: "Affordable motel for a quick stay",
       location: "789 Pine Street, Townsville",
       minNbOfGuests: 1,
       maxNbOfGuests: 3,
       accommodationType: "motel",
       amenities: ["FREE_WIFI", "PARKING"],
       images: [{file:new File(['file content 4'], 'file4.txt', { type: 'text/plain' }), url:'assets/images/img4.jpg'},{file:new File(['file content 5'], 'file5.txt', { type: 'text/plain' }), url:'assets/images/img6.jpg'}],
       intervalsAndPrices: [
         { startDate: new Date(2024, 0, 3).getTime(), endDate: new Date(2024, 0, 7).getTime()  , price:25 },
         { startDate: new Date(2024, 0, 14).getTime(), endDate: new Date(2024, 0, 20).getTime(), price:25 },
         { startDate: new Date(2024, 0, 10).getTime(), endDate: new Date(2024, 0, 20).getTime(), price:25 },
         { startDate: new Date(2024, 0, 23).getTime(), endDate: new Date(2024, 1, 2).getTime() , price:25 },
         { startDate: new Date(2024, 1, 5).getTime(), endDate: new Date(2024, 1, 15).getTime() , price:25 },
         { startDate: new Date(2024, 1, 18).getTime(), endDate: new Date(2024, 1, 28).getTime(), price:25 },
         { startDate: new Date(2024, 2, 2).getTime(), endDate: new Date(2024, 2, 12).getTime() , price:25 },
         { startDate: new Date(2024, 2, 15).getTime(), endDate: new Date(2024, 2, 25).getTime(), price:25 },
         { startDate: new Date(2024, 2, 28).getTime(), endDate: new Date(2024, 3, 7).getTime() , price:25 },
         { startDate: new Date(2024, 3, 10).getTime(), endDate: new Date(2024, 3, 20).getTime(), price:25 },
         { startDate: new Date(2024, 3, 23).getTime(), endDate: new Date(2024, 4, 2).getTime() , price:25 },
         { startDate: new Date(2024, 4, 5).getTime(), endDate: new Date(2024, 4, 15).getTime() , price:25 },
         { startDate: new Date(2024, 4, 18).getTime(), endDate: new Date(2024, 4, 28).getTime(), price:25 },
         { startDate: new Date(2024, 5, 1).getTime(), endDate: new Date(2024, 5, 11).getTime() , price:25 },
         { startDate: new Date(2024, 5, 14).getTime(), endDate: new Date(2024, 5, 24).getTime(), price:25 },
         { startDate: new Date(2024, 5, 27).getTime(), endDate: new Date(2024, 6, 6).getTime() , price:25 },
         { startDate: new Date(2024, 6, 9).getTime(), endDate: new Date(2024, 6, 19).getTime() , price:25 }
       ],
       isPriceSetPerGuest: false,
     };

     return [accommodation1, accommodation2, accommodation3];
   }

   ngOnInit() {
     this.accommodations = this.getTestElements();

     this.service.getAllAvailableAccommodations().subscribe({
       next: (data) => {
         for (let accommodationWithImagesModel of data) {
           this.accommodations.push(accommodationWithImagesModel.accommodation);
         }
       },
       error: (_) => {
         console.log("Error fetching accommodations.")
       }
     })
   }

  OnFilteredReturned(accommodationModels: AccommodationModel[]) {
    this.accommodations = accommodationModels;
  }
}
