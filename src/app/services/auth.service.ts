import { Injectable }               from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable }               from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const baseUrl:string  = "https://owner-api.teslamotors.com";
const clientId        = "81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384";
const clientSecret    = "c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private _http:HttpClient) { }

  login(email:string, password:string):Observable<any>{
    const login:string = "oauth/token";
    const url:string = `${baseUrl}/${login}`;

    const data = {
      "grant_type": "password",
      "client_id": clientId,
      "client_secret": clientSecret,
      "email": email,
      "password": password
    };


    return this._http.post(url, data, httpOptions);
  }

  saveToken(token:string):void{
    localStorage.set("token", token);
  }

  isLogIn(): boolean{
    return !!localStorage.getItem("token");
  }
}
