import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent {

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
  }

}
