import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AccommodationModel} from "../model/accommodation.model";
// import {AccommodationData} from "../model/accommodationData";
@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {

  @Input()
  accommodation: AccommodationModel;

  @Output()
  clicked: EventEmitter<number> = new EventEmitter<number>();

  onAccommodationClicked(): void {
    // this.clicked.emit(this.accommodation.id);
  }

}
