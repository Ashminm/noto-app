import { Component } from '@angular/core';

@Component({
  selector: 'app-privet',
  templateUrl: './privet.component.html',
  styleUrls: ['./privet.component.css']
})
export class PrivetComponent {


  logReg:boolean=false
  constructor(){}


  loginRegStatus(){
   this.logReg = !this.logReg;
  }

}
