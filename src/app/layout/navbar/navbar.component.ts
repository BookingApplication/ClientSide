import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../authentication/auth.service";
import {Router} from "@angular/router";
import {AccommodationsService} from "../../accommodations/accommodations.service";
import {ImageProcessingService} from "../../image-processing.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  role:string;
  constructor(private authService: AuthService, private router: Router, private accommodationService: AccommodationsService) {
  }

  ngOnInit(): void {
    this.authService.userState.subscribe((result:string) => {
      this.role = result;
      console.log(this.role);
    })
    console.log(this.role)
  }

  logout() {
    this.authService.logout().subscribe({
      next:(_) => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['login']);
      }});
    }
}
