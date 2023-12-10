import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title:string = "Accomodations";

  //test elements
  accommodations = [
    { id: 1, name: 'Accommodation1', imageUrl: 'assets/images/img1.jpg' },
    { id: 2, name: 'Accommodation2', imageUrl: 'assets/images/img2.jpg' },
    { id: 3, name: 'Accommodation3', imageUrl: 'assets/images/img3.jpg' },
    { id: 4, name: 'Accommodation4', imageUrl: 'assets/images/img4.jpg' },
    { id: 5, name: 'Accommodation5', imageUrl: 'assets/images/img5.jpg' },
    { id: 6, name: 'Accommodation6', imageUrl: 'assets/images/img6.jpg' },
    // { id: 12, name: 'Accommodation1', imageUrl: 'assets/images/img1.jpg' },
    // { id: 22, name: 'Accommodation2', imageUrl: 'assets/images/img2.jpg' },
    // { id: 32, name: 'Accommodation3', imageUrl: 'assets/images/img3.jpg' },
    // { id: 42, name: 'Accommodation4', imageUrl: 'assets/images/img4.jpg' },
    // { id: 52, name: 'Accommodation5', imageUrl: 'assets/images/img5.jpg' },
    // { id: 62, name: 'Accommodation6', imageUrl: 'assets/images/img6.jpg' }
  ];
}
