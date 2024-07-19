import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent {

  inputValue: string = '';
  InCout:Number=0
  Letter:any

  constructor(private FB:FormBuilder,private Api:BackendApiService){}

  AddTodoForm=this.FB.group({
    title:['',Validators.required]
  })

  getFormData(){
    this.Api.AddTodo(this.AddTodoForm.value).subscribe({
      next:(res:any)=>{
        console.log(res); 
        this.AddTodoForm.reset() 
      },
      error:(err:any)=>{
        console.log(err.statusText,": Already in yor Task");
      }
    })
  }

  resetFm(){
    this.AddTodoForm.reset()
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
