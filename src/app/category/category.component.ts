import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categoryList:any[]=[]
  categoryId:any=[]
  constructor(private Api:BackendApiService,private aroute:ActivatedRoute){
    aroute.params.subscribe((res:any)=>{
      this.categoryId=res.id
      console.log(this.categoryId);
      
    })
  }
  
   getCategoryList(){
    this.Api.getAllNotes().subscribe((res:any)=>{
      this.categoryList=res.filter((item:any)=>item.category == this.categoryId)
      console.log(this.categoryList);
      
    })
  }

}
