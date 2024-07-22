import { Component,OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';


@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  constructor(private Api:BackendApiService){}

  ngOnInit(){
    
  }
}
