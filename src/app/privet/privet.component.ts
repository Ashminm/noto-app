import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-privet',
  templateUrl: './privet.component.html',
  styleUrls: ['./privet.component.css']
})
export class PrivetComponent implements OnInit {

  sectionStatus:boolean=false
  logReg:boolean=false
  constructor(private FB:FormBuilder){}

ngOnInit() {
  this.sectionStatus = sessionStorage.getItem('sectionStatus') === 'true' ? true : false;
}
  sectionsStatus(){
    this.sectionStatus=true
  }

  loginRegStatus(){
   this.logReg = !this.logReg;
  }


  PasscodeForm=this.FB.group({
    passcode1:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode2:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode3:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode4:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]]
  })

  getpasscodeData(){
    console.log(this.PasscodeForm.value);
    
  }

  checkPasscodeForm=this.FB.group({
    passcode1:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode2:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode3:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode4:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]]
  })

  getCheckpasscodeData(){
    console.log(this.checkPasscodeForm.value);
    if(this.checkPasscodeForm.valid){
      this.sectionStatus=true
      sessionStorage.setItem('sectionStatus', 'true');
    }else{
      console.log("Form is invalid");
      sessionStorage.setItem('sectionStatus', 'false');
      
    }
    
  }
  resetCheckForm() {
    this.checkPasscodeForm.reset();
    this.sectionStatus = false;
  }
  
  resetForm() {
    this.PasscodeForm.reset();
    this.sectionStatus = false;
  }

  clearStatus() {
    this.sectionStatus = false;
    sessionStorage.removeItem('sectionStatus');
  }
  



}
