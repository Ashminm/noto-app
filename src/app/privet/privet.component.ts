import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { ToastrService } from 'ngx-toastr';
import { DeletenoteComponent } from '../deletenote/deletenote.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-privet',
  templateUrl: './privet.component.html',
  styleUrls: ['./privet.component.css']
})
export class PrivetComponent implements OnInit {

  PrivetNote:any[]=[]
  sectionStatus:boolean=false
  logReg:boolean=false
  SinglePrivetData:any={}

  inputValue: string = '';
  InCout:Number=0
  Letter:any

  constructor(private FB:FormBuilder,private Api:BackendApiService,private toastr:ToastrService,private dialog: MatDialog){}

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

  UnPrivetNote(id:any){
    console.log(id);
    this.SinglePrivetData=this.PrivetNote.find((item:any)=>item._id===id)
    // console.log(this.SinglePrivetData);
    if(this.SinglePrivetData){
      this.Api.unPrivet(id,this.SinglePrivetData).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.loadaPrivetData()
          this.toastr.success("UnPriveted!!")
        },error:(err:any)=>{
          console.log(err);
          this.toastr.error(err.error)
        }
      })
    }else{
      console.log("not found note")
    }
    
    
  }

  emptyPrivets(){
    const PrivLen=this.PrivetNote.length>0
    if(PrivLen){
      this.Api.emptyPrivet().subscribe({
        next:(res:any)=>{
          console.log(res);
          this.toastr.success(`Deleted ${res.deletedCount} items!`)
          this.loadaPrivetData()
        },error:(err:any)=>{
          this.toastr.error("Deleteion Faild!")
          console.log(err);
        }
      })
    }else{
      this.toastr.info("No items in your privet section")
    }
  }



  openPrivet(_id:string,enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef=this.dialog.open(DeletenoteComponent,{
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{_id}
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.PrivetNote=this.PrivetNote.filter(privet=>privet._id !== _id);
      }
    })
  }

  newPrivetNoteForm=this.FB.group({
    title:['',Validators.required],
    body:['',Validators.required]
  })

  getNewPrivet(){
    console.log(this.newPrivetNoteForm.value);
    this.Api.newPrivetNote(this.newPrivetNoteForm.value).subscribe({
      next:(res:any)=>{
        console.log(res); 
        this.newPrivetNoteForm.reset()
        this.InCout=0
        this.toastr.success("Privet note adedd successfully!!")
        this.Api.getPrivetNotes()
      },
      error:(err:any)=>{
        console.log(err.statusText,":Already in your privet");
        
      }
    })
  }


  resetFm(){
    this.newPrivetNoteForm.reset()
    this.Letter="Letter"
    this.InCout=0
  }

  InpLength(){
    if(this.inputValue.length){
      this.Letter="Letters"
    }else{
      this.Letter="Letter"
    }
    this.InCout=this.inputValue.length 
  }
  
}
