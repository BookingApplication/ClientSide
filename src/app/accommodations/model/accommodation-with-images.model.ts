import {AccommodationModel} from "./accommodation.model";
import {FileHandle} from "./file-handle.model";

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
