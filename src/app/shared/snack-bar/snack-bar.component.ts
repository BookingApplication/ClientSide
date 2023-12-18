import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent {

  constructor(private snackBar: MatSnackBar, private sharedService: SharedService) {
    this.sharedService.newSnackMessage.subscribe((message: string) => {
      if(message !== '') {
        this.openSnackBar(message, "OK")
      }
    })
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
