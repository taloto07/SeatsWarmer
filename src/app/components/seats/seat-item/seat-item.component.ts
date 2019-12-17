import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seat-item',
  templateUrl: './seat-item.component.html',
  styleUrls: ['./seat-item.component.css']
})
export class SeatItemComponent implements OnInit {

  constructor() { }

  level:number = 0;
  name:string = "No name yet";
  disabled:boolean = false;

  ngOnInit() {
  }

  increaseLevel(){
    this.disabled = true;
    setTimeout(() => {
      this.level = (this.level + 1) % 4;
      this.disabled = false;
    }, 4000);

  }

}
