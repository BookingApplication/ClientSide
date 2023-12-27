export interface AccommodationModel {
  name?: string;
  description?: string;
  location?: string;
  minNbOfGuests?: number;
  maxNbOfGuests?: number;
  accommodationType?: string;
  amenities: Array<string>;
  pictures?: Array<string>;
  intervals: Array<Interval>;
  price?: number;
}

export interface Interval {
  startDate?: number; //number of milliseconds since 1.1.1970
  endDate?: number;
  // price?: number;
}

// interface IntervalsAndPrices extends Array<IntervalAndPrice>{
//
// }

// accommodation types:
// aparthotel,
//   apartment,
//   cottage,
//   caravan,
//   chalet,
//   motel,
//   boat,
//   log cabin,
