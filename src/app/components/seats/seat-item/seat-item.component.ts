import {Component, Input, OnInit} from '@angular/core';
import { Seat }                   from '../../../models/seat';
import { CommandService }         from "../../../services/command.service";

@Component({
  selector: 'app-seat-item',
  templateUrl: './seat-item.component.html',
  styleUrls: ['./seat-item.component.css']
})
export class SeatItemComponent implements OnInit {

  constructor(private command:CommandService) { }
  private _disableSeat:boolean;

  seatPropertyNames = ["seat_heater_left", "seat_heater_right"];

  @Input() seat:Seat;
  @Input() vehicleId:string;

  @Input()
  set disableSeat(disableSeats:boolean){
    this._disableSeat = disableSeats;

    // climate control is off, set seat level to 0
    if (disableSeats){
      this.seat.level = 0;
      return;
    }

    // Climate control is turn on sync seat level for front seats and set seat level to 0 for rear seats
    if (this.isFrontSeat(this.seat.number)){
      this.command.getVehicleState(this.vehicleId).subscribe(
        res => {
          let seatLevel = res.response.climate_state[this.seatPropertyNames[this.seat.number]];
          this.seat.level = seatLevel;
        }, err => {
          console.log(this.seat.number, err);
        }
      );
    } else {
      this.command.setSeatHeater(this.seat.number, 0, this.vehicleId).subscribe(
        data => {
          this.seat.level = 0;
        }, err => {
          console.log(this.seat.number, err);
        }
      )
    }
  }

  get disableSeats(){
    return this._disableSeat;
  }

  ngOnInit() {

  }

  increaseLevel(){
    let seatLevel = (this.seat.level + 1) % 4;
    console.log(seatLevel);
    this._disableSeat = true;
    this.command.setSeatHeater(this.seat.number, seatLevel, this.vehicleId).subscribe(
      data => {
        console.log(seatLevel);
        this._disableSeat = false;
        this.seat.level = seatLevel;
      }, err => {
        console.log("set seat error", err);
        this._disableSeat = false;
      }
    );
  }

  isFrontSeat(seatNumber:number){
    return seatNumber === 0 || seatNumber === 1;
  }

}
