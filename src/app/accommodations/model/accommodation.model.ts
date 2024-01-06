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
  intervals: Array<Interval>;
  prices: Array<number>;  //price for each day of the year, prices can vary
  isPriceSetPerGuest: boolean;
}

export interface Interval {
  startDate?: number; //number of milliseconds since 1.1.1970
  endDate?: number;
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
