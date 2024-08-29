import { Component } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  AllArchive:any=[]
  singleArchivedata:any=[]
  constructor(private Api:BackendApiService,private toastr:ToastrService,private route:Router){}

  ngOnInit() {
    this.loadArchiveData()
  }
  loadArchiveData(){
    this.Api.getArchive().subscribe((res:any)=>{
    this.AllArchive=res
    // console.log(this.AllArchive);
    })
  }


  returnNote(id:any){
    console.log(id);
    this.singleArchivedata=this.AllArchive.find((item:any)=>item._id===id)
    // console.log(this.singleArchivedata);
    
    if(this.singleArchivedata){
      this.Api.recoverArchive(id,this.singleArchivedata).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.loadArchiveData()
          this.toastr.success("UnArchived")
          this.route.navigateByUrl('/')
        },error:(err:any)=>{
          console.log(err);
          
        }
      })
    }else{
      console.log("not found note");
      
    }
    
    
  }





}
