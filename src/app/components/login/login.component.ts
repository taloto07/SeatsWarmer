import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  login(){
    var email = this.loginForm.controls.email.value;
    var password = this.loginForm.controls.password.value;
    this._auth.login(email, password);
  }

}
