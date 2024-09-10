import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-privet',
  templateUrl: './privet.component.html',
  styleUrls: ['./privet.component.css']
})
export class PrivetComponent implements OnInit {

  PrivetNote:any[]=[]
  sectionStatus:boolean=false
  logReg:boolean=false
  constructor(private FB:FormBuilder,private Api:BackendApiService,private toastr:ToastrService){}

ngOnInit() {
  this.sectionStatus = sessionStorage.getItem('sectionStatus') === 'true' ? true : false;

  this.loadaPrivetData()
}
  loadaPrivetData(){
    this.Api.getPrivetNotes()
    this.Api.getPrivetNote.subscribe((res:any)=>{
      this.PrivetNote=res
      // console.log(this.PrivetNote);
      sessionStorage.setItem('privetCount',res.length)
      
    })
  }

  sectionsStatus(){
    this.sectionStatus=true
  }

  loginRegStatus(){
   this.logReg = !this.logReg;
  }
// -------------------------- create passcode -------------------------------------
  PasscodeForm=this.FB.group({
    passcode1:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode2:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode3:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode4:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    email:['',[Validators.required,Validators.email]]
  })

  getpasscodeData(){
    console.log("Create Passcode",this.PasscodeForm.value);

    this.Api.createPasscode(this.PasscodeForm.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success(`Passcode Created at ${res.date} !!`)
        this.loginRegStatus()
        this.resetForm()
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.error("Passcode Creation Faild!!",err.error)
      }
    })
  }
// ----------------------end----------------------

  checkPasscodeForm=this.FB.group({
    passcode1:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode2:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode3:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode4:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]]
  })

  getCheckpasscodeData(){
    console.log(this.checkPasscodeForm.value);
    if(this.checkPasscodeForm.valid){
      this.Api.checkPasscode(this.checkPasscodeForm.value).subscribe({
        next:(res:any)=>{
          console.log(res);
          sessionStorage.setItem('ExUserPass',JSON.stringify(res.ExistingPasscode))
          sessionStorage.setItem('token',res.token)
          this.toastr.success("Passcode successfully verifyed!!")
          this.resetCheckForm()

// ---------------------------- pass to user data--------------------------------------------
          this.sectionStatus=true
          sessionStorage.setItem('sectionStatus', 'true');
        },
        error:(err:any)=>{
          this.toastr.error("Passcode verification failded!!",err.error)
          this.resetCheckForm()
        }
      })
     
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
    sessionStorage.removeItem('ExUserPass')
    sessionStorage.removeItem('token')
  }
  
  // ----------------------------- forgot passcode -----------------------------------------

  forgotPasscodeform=this.FB.group({
    passcode1:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode2:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode3:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode4:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    email:['',[Validators.required,Validators.email]]
  })
  NewforgotPasscodeform=this.FB.group({
    passcode1:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode2:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode3:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]],
    passcode4:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]]
    
  })


  
  forgotPasscode() {
    const oldPasscode = this.forgotPasscodeform.value;
    const newPasscode = this.NewforgotPasscodeform.value;
  
    this.Api.forgotpasscode(oldPasscode, newPasscode).subscribe({
      next: (res: any)=>{
        console.log(res);
        this.toastr.success("Passcode updated successsfully!")
        this.resetOld()
        this.resetnew()
      },
      error: (err: any)=>{
        console.error( err);
        this.toastr.error("passcode updation faild!",err.error);
        this.resetOld()
        this.resetnew()
      }
    });
  }

  resetOld(){
    this.forgotPasscodeform.reset()
  }
  resetnew(){
    this.NewforgotPasscodeform.reset()
  }
  
}
