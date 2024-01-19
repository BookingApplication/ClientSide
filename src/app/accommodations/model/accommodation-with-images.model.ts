import {AccommodationModel} from "./accommodation.model";

export interface AccommodationWithImagesModel{
    accommodation: AccommodationModel,
    images : ImageModel[]
}

export interface ImageModel{
    id?: number,
    imagePath: string,
    name: string,
    type: string,
    imageBytes: string
}
