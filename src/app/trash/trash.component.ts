import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { DeletenoteComponent } from '../deletenote/deletenote.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  AllTrash:any[]=[]
  byIdData:any=[]
  constructor(private Api:BackendApiService,private dialog: MatDialog,private toster:ToastrService){}

  ngOnInit() {
    this.loadTrash()
  }


  loadTrash(){
    this.Api.getAllTrash().subscribe((res:any)=>{
      this.AllTrash=res
      // console.log(this.AllTrash);
    })
  }


  emptyTrash(){
   const TrashLength= this.AllTrash.length>0
    if(TrashLength){
      this.Api.emptyTrash().subscribe({
        next:(res:any)=>{
          // console.log(res);
          this.toster.success(`Delete ${res.deletedCount} items in your trash`)
          this.AllTrash=[]
        },error:(err:any)=>{
          console.log(err);
          
        }
      })
    }else{
      this.toster.info("No items in your Bin")
      console.log("No items");
    }
  }

  recoverTrashItem(id:any){
    // console.log(id);
    this.byIdData=this.AllTrash.find((item:any)=>item._id===id)
    console.log(this.byIdData);
    if(this.byIdData){
      this.Api.recoverTrashToNote(id,this.byIdData).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.loadTrash()
          this.toster.success("Recover Success")
        },error:(err:any)=>{
          console.log(err);
          this.toster.error(err.error)
        }
      })
    }
  }


  openDeleteTrash(_id:string,enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeletenoteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { _id }
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.AllTrash =this.AllTrash.filter(trash => trash._id !== _id); 
      }
    });
  }

}
