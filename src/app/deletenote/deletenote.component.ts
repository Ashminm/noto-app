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
  
  DeleteIdTodo: any = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { _id: string },private Api:BackendApiService,private dialogRef: MatDialogRef<DeletenoteComponent>,private router:Router,private toster:ToastrService) { 
    this.DeleteIdTodo=data._id
  }
  
  ngOnInit(){
    // console.log(this.DeleteIdTodo);

  }
  


  deleteTodo() {
    this.Api.DeleteTodo(this.DeleteIdTodo).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dialogRef.close(true);
        this.toster.success("Delete your Task!!") 
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
        this.dialogRef.close(true);
        this.toster.success("Delete your Note!!")
        this.router.navigateByUrl('')
      },
      error: (err: any) => {
        console.log(err);
        this.dialogRef.close(false);
      }
    });
  }

}
