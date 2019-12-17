import { BrowserModule }                        from '@angular/platform-browser';
import { NgModule }                             from '@angular/core';
import { ReactiveFormsModule }                  from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }  from '@angular/common/http';
import { AppRoutingModule }                     from './app-routing.module';

import { AppComponent }                         from './app.component';
import { LoginComponent }                       from './components/login/login.component';
import { SeatsComponent }                       from './components/seats/seats.component';
import { HomeComponent }                        from './components/home/home.component';
import { TokenInterceptorService }              from "./services/token-interceptor.service";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guards/auth.guard";
import { SeatItemComponent } from './components/seats/seat-item/seat-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeatsComponent,
    HomeComponent,
    SeatItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
