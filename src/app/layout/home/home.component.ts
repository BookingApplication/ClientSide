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
       intervals: [
         { startDate: new Date(2024, 0, 1).getTime(), endDate: new Date(2024, 0, 5).getTime() },
         { startDate: new Date(2024, 0, 10).getTime(), endDate: new Date(2024, 0, 15).getTime() },
         { startDate: new Date(2024, 0, 20).getTime(), endDate: new Date(2024, 0, 25).getTime() },
         { startDate: new Date(2024, 0, 28).getTime(), endDate: new Date(2024, 1, 3).getTime() },
         { startDate: new Date(2024, 1, 7).getTime(), endDate: new Date(2024, 1, 14).getTime() },
         { startDate: new Date(2024, 1, 18).getTime(), endDate: new Date(2024, 1, 23).getTime() },
         { startDate: new Date(2024, 1, 28).getTime(), endDate: new Date(2024, 2, 4).getTime() },
         { startDate: new Date(2024, 2, 8).getTime(), endDate: new Date(2024, 2, 15).getTime() },
         { startDate: new Date(2024, 2, 18).getTime(), endDate: new Date(2024, 2, 25).getTime() },
         { startDate: new Date(2024, 2, 28).getTime(), endDate: new Date(2024, 2, 31).getTime() },
         { startDate: new Date(2024, 2, 4).getTime(), endDate: new Date(2024, 2, 11).getTime() },
         { startDate: new Date(2024, 2, 15).getTime(), endDate: new Date(2024, 2, 22).getTime() },
         { startDate: new Date(2024, 2, 25).getTime(), endDate: new Date(2024, 2, 30).getTime() },
         { startDate: new Date(2024, 2, 5).getTime(), endDate: new Date(2024, 2, 12).getTime() },
         { startDate: new Date(2024, 2, 16).getTime(), endDate: new Date(2024, 2, 23).getTime() },
         { startDate: new Date(2024, 2, 26).getTime(), endDate: new Date(2024, 2, 31).getTime() },
         { startDate: new Date(2024, 2, 1).getTime(), endDate: new Date(2024, 2, 7).getTime() }
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
       id:2,
       name: "Cozy Cottage",
       description: "Charming cottage for a peaceful retreat",
       location: "456 Oak Street, Villageland",
       minNbOfGuests: 1,
       maxNbOfGuests: 2,
       accommodationType: "cottage",
       amenities: ["FREE_WIFI", "PRIVATE_BATHROOM", "FREE_BREAKFAST"],
       images: [{file:new File(['file content 3'], 'file3.txt', { type: 'text/plain' }), url:'assets/images/img3.jpg'},{file:new File(['file content 4'], 'file4.txt', { type: 'text/plain' }), url:'assets/images/img4.jpg'}],
       intervals: [
         { startDate: new Date(2024, 0, 5).getTime(), endDate: new Date(2024, 0, 8).getTime() },
         { startDate: new Date(2024, 0, 12).getTime(), endDate: new Date(2024, 0, 18).getTime() },
         { startDate: new Date(2024, 0, 22).getTime(), endDate: new Date(2024, 0, 25).getTime() },
         { startDate: new Date(2024, 1, 1).getTime(), endDate: new Date(2024, 1, 7).getTime() },
         { startDate: new Date(2024, 1, 11).getTime(), endDate: new Date(2024, 1, 15).getTime() },
         { startDate: new Date(2024, 1, 20).getTime(), endDate: new Date(2024, 1, 25).getTime() },
         { startDate: new Date(2024, 2, 1).getTime(), endDate: new Date(2024, 2, 8).getTime() },
         { startDate: new Date(2024, 2, 12).getTime(), endDate: new Date(2024, 2, 18).getTime() },
         { startDate: new Date(2024, 2, 22).getTime(), endDate: new Date(2024, 2, 28).getTime() },
         { startDate: new Date(2024, 3, 5).getTime(), endDate: new Date(2024, 3, 12).getTime() },
         { startDate: new Date(2024, 3, 17).getTime(), endDate: new Date(2024, 3, 22).getTime() },
         { startDate: new Date(2024, 3, 27).getTime(), endDate: new Date(2024, 3, 30).getTime() },
       ],
       prices: Array.from({length:365}, (_,num)=>num%40+30),
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
       intervals: [
         { startDate: new Date(2024, 0, 3).getTime(), endDate: new Date(2024, 0, 7).getTime() },
         { startDate: new Date(2024, 0, 14).getTime(), endDate: new Date(2024, 0, 20).getTime() },
         { startDate: new Date(2024, 0, 10).getTime(), endDate: new Date(2024, 0, 20).getTime() },
         { startDate: new Date(2024, 0, 23).getTime(), endDate: new Date(2024, 1, 2).getTime() },
         { startDate: new Date(2024, 1, 5).getTime(), endDate: new Date(2024, 1, 15).getTime() },
         { startDate: new Date(2024, 1, 18).getTime(), endDate: new Date(2024, 1, 28).getTime() },
         { startDate: new Date(2024, 2, 2).getTime(), endDate: new Date(2024, 2, 12).getTime() },
         { startDate: new Date(2024, 2, 15).getTime(), endDate: new Date(2024, 2, 25).getTime() },
         { startDate: new Date(2024, 2, 28).getTime(), endDate: new Date(2024, 3, 7).getTime() },
         { startDate: new Date(2024, 3, 10).getTime(), endDate: new Date(2024, 3, 20).getTime() },
         { startDate: new Date(2024, 3, 23).getTime(), endDate: new Date(2024, 4, 2).getTime() },
         { startDate: new Date(2024, 4, 5).getTime(), endDate: new Date(2024, 4, 15).getTime() },
         { startDate: new Date(2024, 4, 18).getTime(), endDate: new Date(2024, 4, 28).getTime() },
         { startDate: new Date(2024, 5, 1).getTime(), endDate: new Date(2024, 5, 11).getTime() },
         { startDate: new Date(2024, 5, 14).getTime(), endDate: new Date(2024, 5, 24).getTime() },
         { startDate: new Date(2024, 5, 27).getTime(), endDate: new Date(2024, 6, 6).getTime() },
         { startDate: new Date(2024, 6, 9).getTime(), endDate: new Date(2024, 6, 19).getTime() }
       ],
       prices: Array.from({length:365}, (_,num)=>num%30+40),
       isPriceSetPerGuest: false,
     };

     const accommodation4: AccommodationModel = {
       id: 4,
       name: "Comfortable Apartment",
       description: "Spacious apartment for a relaxing stay",
       location: "456 Oak Street, Cityville",
       minNbOfGuests: 2,
       maxNbOfGuests: 4,
       accommodationType: "apartment",
       amenities: ["FREE_WIFI", "PARKING", "ROOM_SERVICE", "SWIMMING_POOL", "AIR_CONDITIONING"],
       images: [
         { file: new File(['file content 2'], 'file2.txt', { type: 'text/plain' }), url: 'assets/images/img2.jpg' },
         { file: new File(['file content 3'], 'file3.txt', { type: 'text/plain' }), url: 'assets/images/img3.jpg' }
       ],
       intervals: [
         { startDate: new Date(2024, 0, 2).getTime(), endDate: new Date(2024, 0, 10).getTime() },
         { startDate: new Date(2024, 0, 15).getTime(), endDate: new Date(2024, 0, 25).getTime() },
         { startDate: new Date(2024, 2, 2).getTime(), endDate: new Date(2024, 2, 12).getTime() },
         { startDate: new Date(2024, 2, 15).getTime(), endDate: new Date(2024, 2, 25).getTime() },
         { startDate: new Date(2024, 2, 28).getTime(), endDate: new Date(2024, 3, 7).getTime() },
         { startDate: new Date(2024, 3, 10).getTime(), endDate: new Date(2024, 3, 20).getTime() },

       ],
       prices: Array.from({length:365}, (_, num)=>num%30+50),
       isPriceSetPerGuest: false,
     };

     const accommodation5: AccommodationModel = {
       id: 5,
       name: "Rustic Cottage",
       description: "Charming cottage in a peaceful countryside",
       location: "123 Pine Lane, Villagetown",
       minNbOfGuests: 3,
       maxNbOfGuests: 6,
       accommodationType: "cottage",
       amenities: ["FREE_WIFI", "PARKING", "LOG_FIREPLACE", "PRIVATE_BATHROOM", "LUGGAGE_STORAGE"],
       images: [
         { file: new File(['file content 6'], 'file6.txt', { type: 'text/plain' }), url: 'assets/images/img6.jpg' },
         { file: new File(['file content 7'], 'file7.txt', { type: 'text/plain' }), url: 'assets/images/img4.jpg' }
       ],
       intervals: [
         { startDate: new Date(2024, 0, 3).getTime(), endDate: new Date(2024, 0, 12).getTime() },
         { startDate: new Date(2024, 0, 18).getTime(), endDate: new Date(2024, 0, 28).getTime() },
         { startDate: new Date(2024, 4, 5).getTime(), endDate: new Date(2024, 4, 15).getTime() },
         { startDate: new Date(2024, 4, 18).getTime(), endDate: new Date(2024, 4, 28).getTime() },
         { startDate: new Date(2024, 5, 1).getTime(), endDate: new Date(2024, 5, 11).getTime() },
         { startDate: new Date(2024, 5, 14).getTime(), endDate: new Date(2024, 5, 24).getTime() },

       ],
       prices: Array.from({ length: 365 }, (_, num) => num % 50 + 40),
       isPriceSetPerGuest: false,
     };

     const accommodation6: AccommodationModel = {
       id: 6,
       name: "Luxury Hotel",
       description: "Elegant hotel with top-notch amenities",
       location: "789 Maple Avenue, Luxville",
       minNbOfGuests: 1,
       maxNbOfGuests: 2,
       accommodationType: "hotel",
       amenities: ["FREE_WIFI", "PARKING", "ROOM_SERVICE", "SWIMMING_POOL", "BUSINESS_CENTER"],
       images: [
         { file: new File(['file content 8'], 'file8.txt', { type: 'text/plain' }), url: 'assets/images/img2.jpg' },
         { file: new File(['file content 9'], 'file9.txt', { type: 'text/plain' }), url: 'assets/images/img5.jpg' }
       ],
       intervals: [
         { startDate: new Date(2024, 0, 1).getTime(), endDate: new Date(2024, 0, 11).getTime() },
         { startDate: new Date(2024, 0, 15).getTime(), endDate: new Date(2024, 0, 25).getTime() },
         { startDate: new Date(2024, 4, 5).getTime(), endDate: new Date(2024, 4, 15).getTime() },
         { startDate: new Date(2024, 4, 18).getTime(), endDate: new Date(2024, 4, 28).getTime() },
         { startDate: new Date(2024, 5, 1).getTime(), endDate: new Date(2024, 5, 11).getTime() },
         { startDate: new Date(2024, 5, 14).getTime(), endDate: new Date(2024, 5, 24).getTime() },
       ],
       prices: Array.from({ length: 365 }, (_, num) => num % 61 + 40),
       isPriceSetPerGuest: false,
     };

     return [accommodation1, accommodation2, accommodation3, accommodation4, accommodation5, accommodation6];
   }

   ngOnInit() {
     //this.accommodations = this.getTestElements();

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
