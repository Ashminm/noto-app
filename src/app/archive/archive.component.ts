import { Component } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeletenoteComponent } from '../deletenote/deletenote.component';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  AllArchive:any[]=[]
  singleArchivedata:any=[]
  constructor(private Api:BackendApiService,private toastr:ToastrService,private route:Router,private dialog: MatDialog){}

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
      console.log("not found note")
    } 
  }

  emptyArchive(){
    const ArchiveLen= this.AllArchive.length>0
    if(ArchiveLen){
      this.Api.emptyArchive().subscribe({
        next:(res:any)=>{
          console.log(res);
          this.toastr.success(`Deleted ${res.deletedCount} items `)
          this.loadArchiveData()
        },error:(err:any)=>{
          console.log(err);
          this.toastr.error("Deleteion Faild!")
        }
      })
    }else{
      this.toastr.info("No items in your Archive")
    }
    
  }

  openDeleteArchive(_id:string,enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeletenoteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { _id }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.AllArchive=this.AllArchive.filter(arch=> arch._id !== _id);
      }
    })
    
  }




}
