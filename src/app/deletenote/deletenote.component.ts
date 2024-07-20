import { Component,Inject,OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef } from '@angular/material/dialog';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-deletenote',
  templateUrl: './deletenote.component.html',
  styleUrls: ['./deletenote.component.css']
})
export class DeletenoteComponent implements OnInit {
  DeleteIdTodo: any = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { _id: string },private Api:BackendApiService,private dialogRef: MatDialogRef<DeletenoteComponent>) { 
    this.DeleteIdTodo=data._id
  }
  
  ngOnInit(){
    // console.log(this.DeleteIdTodo);
    this.initialize()
  }
  
  initialize() {

  }

  deleteTodo(): void {
    this.Api.DeleteTodo(this.DeleteIdTodo).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dialogRef.close(true); 
        this.initialize()
      },
      error: (err: any) => {
        console.log(err);
        this.dialogRef.close(false);
      }
    });
  }

}
