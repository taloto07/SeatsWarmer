import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  baseUrl:string      = "https://owner-api.teslamotors.com";
  vehiclesUrl:string  = "api/1/vehicles";
  clientId:string     = "81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384";
  clientSecret:string = "c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3";
  vehicleId:number;

  constructor(private http:HttpClient) { }

  getVehicles():Observable<any>{

    let url:string = `${this.baseUrl}/${this.vehiclesUrl}`;
    return this.http.get(url);
  }

  wakeUpVehicle(id:string):Observable<any>{
    let wakeUrl:string = `${this.baseUrl}/${this.vehiclesUrl}/${id}/wake_up`;
    return this.http.post(wakeUrl, {});
  }

  getVehicleState(id:string):Observable<any>{
    let stateUrl:string = `${this.baseUrl}/${this.vehiclesUrl}/${id}/vehicle_data`;
    return this.http.get(stateUrl);
  }

  setSeatHeater(seatNumber:number, level:number, id:string):Observable<any>{
    let url = `${this.baseUrl}/${this.vehiclesUrl}/${id}/command/remote_seat_heater_request`;
    let data = {
      heater: seatNumber,
      level: level
    };
    return this.http.post(url, data);
  }

  startClimateControlSystem(id:string):Observable<any>{
    let url = `${this.baseUrl}/${this.vehiclesUrl}/${id}/command/auto_conditioning_start`;
    return this.http.post(url, {});
  }

  stopClimateControlSystem(id:string):Observable<any>{
    let url = `${this.baseUrl}/${this.vehiclesUrl}/${id}/command/auto_conditioning_stop`;
    return this.http.post(url, {});
  }
}
