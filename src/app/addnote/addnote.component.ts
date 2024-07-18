import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.css']
})
export class AddnoteComponent {

  constructor(private FB:FormBuilder,private Api:BackendApiService){}

  AddForm=this.FB.group({
    title:['',Validators.required],
    body:['',Validators.required]
  })


  getFormData(){
      // console.log(this.AddForm.value); 
      this.Api.AddNotes(this.AddForm.value).subscribe({
        next:(res:any)=>{
          console.log(res);  
        },
        error:(err:any)=>{
          console.log(err.statusText);
          
        }
      })
  }

}
