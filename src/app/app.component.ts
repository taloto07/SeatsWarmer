import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router }       from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SeatsWarmer';

  constructor(public _auth: AuthService, private _router:Router) {
  }
}
