import { Component, OnInit }                  from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService }                        from '../../services/auth.service';
import { Router }                             from '@angular/router';

const credentialsIncorrectErrorMessage:string = "Credentials are incorrect!";
const crossOriginErrorMessage:string = "Cross origin restriction!";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private _auth: AuthService,
              private _router:Router,
              ) { }

  loginMessage:string = "";

  ngOnInit() {
  }

  login(){
    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;
    this._auth.login(email, password)
      .subscribe(
        res => {
          this._auth.saveToken(res.access_token);
          this._router.navigateByUrl(this._auth.redirectUrl);
          this._auth.redirectUrl = "/";
        },
        err => {
          if (err.status == 401){
            this.loginMessage = credentialsIncorrectErrorMessage;
          } else {
            this.loginMessage = crossOriginErrorMessage;
          }
        }
      )
  }
}
