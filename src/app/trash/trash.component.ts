import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  AllTrash:any[]=[]

  constructor(private Api:BackendApiService){}

  ngOnInit() {
    this.loadTrash()
  }


  loadTrash(){
    this.Api.getAllTrash().subscribe((res:any)=>{
      this.AllTrash=res
      console.log(this.AllTrash);
      sessionStorage.setItem("trashLength",this.AllTrash.length.toString())
    })
  }
}
