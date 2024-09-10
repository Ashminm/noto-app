import { Component, OnInit } from '@angular/core';
import { DeletenoteComponent } from '../deletenote/deletenote.component';
import { MatDialog } from '@angular/material/dialog';
import { BackendApiService } from '../services/backend-api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-note-home',
  templateUrl: './note-home.component.html',
  styleUrls: ['./note-home.component.css']
})
export class NoteHomeComponent implements OnInit {

  hasChanges: boolean = false;
  AllNotes: any[] = [];
  AllTodos: any[] = [];
  TrashCount:Number=0
  ArchiveCount:Number=0
  PrivetCount:any=sessionStorage.getItem('privetCount')||0

  constructor(private dialog: MatDialog, private Api: BackendApiService,private toastr:ToastrService) {}

  ngOnInit() {
    this.loadNotes();
    this.loadTodos();
    this.getAlltrash()
    this.getAllArchive()  
  }

  loadNotes() {
    this.Api.FetchNotes()
    this.Api.getHomeNote.subscribe((res: any) => {
      this.AllNotes = res;
      // console.log(this.AllNotes);
    });
  }

  loadTodos() {
    this.Api.FetchTodo()
    this.Api.getHomeTodo.subscribe((res: any) => {
      this.AllTodos = res;
      // console.log(this.AllTodos);
    });
  }

  getAlltrash(){
    this.Api.getAllTrash().subscribe((res:any)=>{
      this.TrashCount=res.length
      // console.log(this.TrashCount);
      
    })
  }

  getAllArchive(){
    this.Api.getArchive().subscribe((res:any)=>{
      this.ArchiveCount=res.length
    })
  }


  onContentChange() {
    this.hasChanges = true;
  }

  editTodo(todo: any) {
    this.Api.editTodo(todo._id, todo).subscribe(
      (res: any) => {
        const index = this.AllTodos.findIndex(t => t._id === todo._id);
        if (index !== -1) {
          this.AllTodos[index] = res;
        }
        this.loadTodos()
        this.toastr.success("Updated Successfully!!")
        this.hasChanges = false;
      },
      error => {
        console.error('Error updating todo:', error);
        this.toastr.info(`${todo.title} is Already Exist in the list!!`)
      }
    );
  }

  openDelete(_id: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeletenoteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { _id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.AllTodos = this.AllTodos.filter(todo => todo._id !== _id);
      }
    });
  }
}


