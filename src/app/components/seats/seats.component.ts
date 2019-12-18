import { Component, OnInit }  from '@angular/core';
import { CommandService }     from "../../services/command.service";
import { Seat }               from "../../models/seat";

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  errorMessage:string = "error message display here";

  vehicleId:string;
  name:string;
  disabled:boolean = true;

  frontLeftSeat:Seat    = new Seat("Driver", 0, 0);
  frontRightSeat:Seat   = new Seat("Passenger", 1, 0);
  rearLeftSeat:Seat     = new Seat("Rear Left", 2, 0);
  rearCenterSeat:Seat   = new Seat("Reat Center", 4, 0);
  rearRightSeat:Seat    = new Seat("Rear Right", 5, 0);
  disableSeats:boolean  = true;

  climate:any = {
    disabled: true,
    state: false,
  };

  constructor(private command:CommandService) { }

  ngOnInit() {
    // get vehicle's id.
    // if vehicle is not online, wakeup vehicle.
    this.command.getVehicles().subscribe(
      res => {
        this.vehicleId  = res.response[0].id_s;
        this.name       = res.response[0].display_name;
        this.command.getVehicleState(this.vehicleId).subscribe(
          res => {
            console.log(res);
            let climateState = res.response.climate_state.is_climate_on;
            if (climateState){
              this.climate.state = climateState;
              this.disableSeats = false;
            }
            this.climate.disabled = false;
          }, err => {
            this.climate.disabled = false;
            console.log(err);
            this.setErrorMessage("error getting vehicle's state!")
          }
        );
      }, err =>{
        console.log(err);
        this.setErrorMessage("can not get vehicle's info!");
      }
    );
  }

  isOnline(state:string):boolean{
    return "online" === state;
  }

  toggleClimate(){
    // disable button
    this.climate.disabled = true;
    // if it is on, turn it off
    if (this.climate.state){
      this.stopClimateControl();
    } else { // turn if on
      this.startClimateControl();
    }
  }

  startClimateControl(){
    this.command.startClimateControlSystem(this.vehicleId).subscribe(
      res => {
        console.log(res);
        this.climate.disabled = false;
        this.climate.state = true;
        this.disableSeats = false;
      }, err => {
        console.log(err);
        this.climate.disabled = false;
      }
    );
  }

  stopClimateControl(){
    this.command.stopClimateControlSystem(this.vehicleId).subscribe(
      res => {
        console.log(res);
        this.climate.disabled = false;
        this.climate.state = false;
        this.disableSeats = true;
      }, err => {
        console.log(err);
        this.climate.disabled = false;
      }
    )
  }

  getVehicleClimateState(){
    this.command.getVehicleState(this.vehicleId).subscribe(
      res => {
        console.log("vehicle state", res.response);
        console.log("climate state: ", res.response.climate_state);
      }, err => {
        console.log(err);
      }
    );
  }

  wakeUpVehicle(){
    this.disableRefreshButton();
    this.command.getVehicleState(this.vehicleId).subscribe(
      res => {
        if ( this.isOnline(res.response.state) ){
          console.log("vehicle is online");
          this.enableRefreshButton();
          return;
        }
        console.log("vehicle is offline, going to wakeup vehicle!");
        // this.command.wakeUpVehicle(this.vehicleId).subscribe(
        //   res => {
        //     console.log(res);
        //   }, err => {
        //     console.log(err);
        //   }
        // );
      }, err => {
        this.enableRefreshButton();
        console.log(err);
      }
    )
  }

  disableRefreshButton(){
    this.disabled = true;
  }

  enableRefreshButton(){
    this.disabled = false;
  }

  setErrorMessage(message:string){
    this.errorMessage = message;
  }

}
