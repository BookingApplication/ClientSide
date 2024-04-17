import {FileHandle} from "./file-handle.model";

export interface AccommodationModel {
  id?:number;
  name?: string;
  description?: string;
  location?: string;
  minNbOfGuests?: number;
  maxNbOfGuests?: number;
  accommodationType?: string;
  amenities: Array<string>;
  images: Array<FileHandle>;
  intervalsAndPrices: Array<IntervalAndPrice>;
  isPriceSetPerGuest: boolean;
  isReservationManual?: boolean;
}

export interface IntervalAndPrice {
  startDate?: number; //number of milliseconds since 1.1.1970
  endDate?: number;
  price?:number;
}

// accommodation types:
// aparthotel,
//   apartment,
//   cottage,
//   caravan,
//   chalet,
//   motel,
//   boat,
//   log cabin,
