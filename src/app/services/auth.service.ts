import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email:string, password:string){
    console.log(email, password);
    localStorage.setItem('email', email);
  }
}
