import { Component,Inject,OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef } from '@angular/material/dialog';
import { BackendApiService } from '../services/backend-api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-deletenote',
  templateUrl: './deletenote.component.html',
  styleUrls: ['./deletenote.component.css']
})
export class DeletenoteComponent implements OnInit {
  AllTrashs:any[]=[]
  trash:any={}
  DeleteIdTodo: any = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { _id: string },private Api:BackendApiService,private dialogRef: MatDialogRef<DeletenoteComponent>,private router:Router,private toster:ToastrService) { 
    this.DeleteIdTodo=data._id
  }
  
  ngOnInit(){
    // console.log(this.DeleteIdTodo);

    this.addTrash()
    
  }
  


  deleteTodo() {
    this.Api.DeleteTodo(this.DeleteIdTodo).subscribe({
      next: (res: any) => {
        console.log(res);
        this.trash=res
        this.addTrash();
        this.dialogRef.close(true);
        // this.toster.success("Delete your Task!!") 
      },
      error: (err: any) => {
        console.log(err);
        this.dialogRef.close(false);
      }
    });
  }


  deleteNote() {
    this.Api.DeleteNote(this.DeleteIdTodo).subscribe({
      next: (res: any) => {
        console.log(res);
        this.trash=res
        this.addTrash();
        this.dialogRef.close(true);
        // this.toster.success("Delete your Note!!")
        this.router.navigateByUrl('')
      },
      error: (err: any) => {
        console.log(err);
        this.dialogRef.close(false);
      }
    });
  }

  addTrash() {
    console.log("Trash todo", this.trash); 
    this.Api.addTrash(this.trash).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.AllTrashs=res
        console.log("All Add Trash",this.AllTrashs);
      },
      error:(err:any)=>{
        console.log(err.error);
        
      }
    })
  }


}




