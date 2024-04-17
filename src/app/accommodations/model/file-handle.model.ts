//object representing image file and url to that image
import {SafeUrl} from "@angular/platform-browser";

export interface FileHandle {
  file:File,
  url:SafeUrl
}
