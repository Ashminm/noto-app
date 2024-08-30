import { Component } from '@angular/core';

@Component({
  selector: 'app-privet',
  templateUrl: './privet.component.html',
  styleUrls: ['./privet.component.css']
})
export class PrivetComponent {

  sectionStatus:boolean=true
  logReg:boolean=false
  constructor(){}


  sectionsStatus(){
    this.sectionStatus=true
  }

  loginRegStatus(){
   this.logReg = !this.logReg;
  }

}
