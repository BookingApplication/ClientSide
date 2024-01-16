import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../authentication/auth.service";
import {Router} from "@angular/router";
import {RegistrationModel} from "../../authentication/model/registration.model";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  accountDetailsForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl(""),
    name: new FormControl("", [Validators.required]),
    surname: new FormControl("", [Validators.required]),
    livingAddress: new FormControl("", [Validators.required]),
    telephoneNumber: new FormControl("", [Validators.required]),
  });
  role:string;
  accountData: RegistrationModel = {
    email: "",
    password: "",
    name: "",
    surname: "",
    livingAddress: "",
    telephoneNumber: ""
  }

  constructor(private service: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    const helper:JwtHelperService = new JwtHelperService();
    const token = localStorage.getItem('user');
    const decoded = helper.decodeToken(token!);
    this.role = decoded.role;
    this.initAccountData();
  }

  initAccountData(): void {
    this.service.getAccountData().subscribe({
      next: (data: RegistrationModel) => {
        this.accountData = data;
        this.fillInForm()
      },
      error: (_) => {
        console.log("Error getting data.")
      }
    })
  }

  fillInForm() {
    this.accountDetailsForm.patchValue({
      email: this.accountData.email,
      name: this.accountData.name,
      surname: this.accountData.surname,
      livingAddress: this.accountData.livingAddress,
      telephoneNumber: this.accountData.telephoneNumber
    });
  }

  saveChanges() {
    if (this.accountDetailsForm.valid) {
      const newAccountData: RegistrationModel = {
        email: this.accountDetailsForm.value.email!,
        password: this.accountDetailsForm.value.password != null ? this.accountDetailsForm.value.password : "",
        name: this.accountDetailsForm.value.name!,
        surname: this.accountDetailsForm.value.surname!,
        livingAddress: this.accountDetailsForm.value.livingAddress!,
        telephoneNumber: this.accountDetailsForm.value.telephoneNumber!
      };

      this.service.updateAccountData(newAccountData).subscribe({
          next: (data) => {
            this.router.navigate(['home'])
          },
          error: (_) => {
            console.log("Update account data error.")
          }
        }
      )
    }
  }

  cancel() {
    this.router.navigate(['home']);
  }

  deleteAccount() {
    this.service.deleteAccount(this.accountData.id!).subscribe({
      next: (data: string) => {
        console.log(data);
      },

      error: (err) => {
        console.log();
      }
    })
  }

  protected readonly localStorage = localStorage;
}
