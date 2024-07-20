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

  AllNotes: any[] = [];
  AllTodos: any[] = [];

  constructor(private dialog: MatDialog, private Api: BackendApiService,private toastr:ToastrService) {}

  ngOnInit() {
    this.loadNotes();
    this.loadTodos();
  }

  loadNotes() {
    this.Api.getAllNotes().subscribe((res: any) => {
      this.AllNotes = res;
      // console.log(this.AllNotes);
    });
  }

  loadTodos() {
    this.Api.getAllTodos().subscribe((res: any) => {
      this.AllTodos = res;
      // console.log(this.AllTodos);
    });
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










  // GetCategory() {
  //   this.Api.getAllNotes().subscribe((res: any) => {
  //     if (res && res.length) {
  //       res.forEach(({ category }: any) => {
  //         if (!this.categories.some(cat => cat.name === category)) {
  //           this.categories.push({ name: category, length: category.length });
  //         }
  //       });
  //       console.log(this.categories);
        
  //     } else {
  //       console.error("No Category.");
  //     }
  //   });
  // }


