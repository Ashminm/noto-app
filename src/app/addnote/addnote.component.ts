import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.css']
})
export class AddnoteComponent {

  inputValue: string = '';
  InCout:Number=0
  Letter:any
  constructor(private FB:FormBuilder,private Api:BackendApiService){}

  AddForm=this.FB.group({
    title:['',Validators.required],
    body:['',Validators.required]
  })

  getFormData(){
      this.Api.AddNotes(this.AddForm.value).subscribe({
        next:(res:any)=>{
          console.log(res); 
          this.AddForm.reset()
        },
        error:(err:any)=>{
          console.log(err.statusText,":Already in your note");
          
        }
      })
  }

  resetFm(){
    this.AddForm.reset()
    this.InCout=0
    this.Letter="Letter"
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
