import {AfterViewInit, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../authentication/auth.service";
import {Router} from "@angular/router";
import {RegistrationModel} from "../../authentication/model/registration.model";
// import {ManageAccountDataModel} from "../../authentication/model/manageAccountData.model";

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements AfterViewInit{

  accountDetailsForm = new FormGroup({
    email: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required]),
    name: new FormControl("",[Validators.required]),
    surname: new FormControl("",[Validators.required]),
    livingAddress: new FormControl("",[Validators.required]),
    telephoneNumber: new FormControl("",[Validators.required]),
  });

  accountData : RegistrationModel = {
    email: "",
    password: "",
    name: "",
    surname: "",
    livingAddress: "",
    telephoneNumber: ""
  }

  constructor(private service:AuthService, private router:Router) {

  }

  initAccountData():void{
    //change logic to work w/ jwt
    //input into localStorage
    //   let email = localStorage.getItem("email");
    //   if (email==null) email="";
    let email = "guest1@example.com";
      this.service.getAccountData(email).subscribe({
        next: (data: RegistrationModel) => { this.accountData = data; },
        error: (_) => {console.log("Error getting data.")}
    })
  }

  fillInForm()
  {
    this.accountDetailsForm.value.email = this.accountData.email;
    this.accountDetailsForm.value.password = this.accountData.password;
    this.accountDetailsForm.value.name = this.accountData.name;
    this.accountDetailsForm.value.surname = this.accountData.surname;
    this.accountDetailsForm.value.livingAddress = this.accountData.livingAddress;
    this.accountDetailsForm.value.telephoneNumber = this.accountData.telephoneNumber;
  }

  ngAfterViewInit(): void {
    this.initAccountData();
    this.fillInForm();
  }

  saveChanges() {
    if (this.accountDetailsForm.valid) {
      //mozda moze da ostane registration model, jer se mogu promeniti svi podaci,
      //nije ograniceno da se ne moze promeniti email
      const newAccountData: RegistrationModel = {
        email: this.accountDetailsForm.value.email!,
        password: this.accountDetailsForm.value.password!,
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
// constructor(private router:Router) {
// }
  cancel() {
    this.router.navigate(['home']);
  }
}
