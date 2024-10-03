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
  isLoading = true;
  inputValue: string = '';
  hasChanges: boolean = false;
  searchKey:any=""
  AllNotes: any[] = [];
  AllTodos: any[] = [];
  TrashCount:Number=0
  ArchiveCount:Number=0
  PrivetCount:any=sessionStorage.getItem('privetCount')||0
// --------------------day wishing----------------------
  Wish:any=""
  today=new Date()
  curHr= this.today.getHours()
  curDate=this.today.toDateString()

  constructor(private dialog: MatDialog, private Api: BackendApiService,private toastr:ToastrService) {}

  ngOnInit() {
    this.loadNotes();
    this.loadTodos();
    this.getAlltrash()
    this.getAllArchive()  
// ---------------Day wishing----------------------------- 
    if(this.curHr <12 && this.curHr >= 5){
      this.Wish="Good Morning"
    }else if(this.curHr <18 && this.curHr >=12){
      this.Wish="Good Afternoon"
    }else if(this.curHr >=18 && this.curHr <19){
      this.Wish="Good Evening"
    }else{
      this.Wish="Good Night"
    }
    // console.log(this.Wish);
    this.isLoading = true; 
  }


  loadNotes() {
    this.isLoading = true; 
    this.Api.FetchNotes()
    this.Api.getHomeNote.subscribe((res: any) => {
      this.AllNotes = res;
      // console.log(this.AllNotes);
      sessionStorage.setItem("Notes",res.length)
      this.isLoading = false;

    });
  }

  loadTodos() {
    this.isLoading = true; 
    this.Api.FetchTodo()
    this.Api.getHomeTodo.subscribe((res: any) => {
      this.AllTodos = res;
      // console.log(this.AllTodos);
    this.isLoading = false;
    sessionStorage.setItem("Todos",res.length)


    });
  }

  getAlltrash(){
    this.Api.getAllTrash().subscribe((res:any)=>{
      this.TrashCount=res.length
      // console.log(this.TrashCount);
      sessionStorage.setItem("TrashCu",res.length)
      
    })
  }

  getAllArchive(){
    this.Api.getArchive().subscribe((res:any)=>{
      this.ArchiveCount=res.length
      sessionStorage.setItem("ArchiveCu",res.length)

    })
  }


  onContentChange() {
    this.hasChanges = true;
  }

  editTodo(todo: any) {
    this.Api.editTodo(todo._id, todo).subscribe({
      next: (res: any) => {
        const index = this.AllTodos.findIndex(t => t._id === todo._id);
        if (index !== -1) {
          this.AllTodos[index] = res;
        }
        this.loadTodos();
        this.toastr.success("Updated Successfully!!");
        this.hasChanges = false;
      },
      error: (err: any) => {
        console.error("Error updating todo", err);
        this.toastr.error(err.error);
      }
    });
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

  NoteopenDelete(_id: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeletenoteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { _id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.AllNotes = this.AllNotes.filter(Note => Note._id !== _id);
      }
    });
  }


  getBackgroundColor(index: number): string {
    const r = Math.floor(Math.random() * 256); 
    const g = Math.floor(Math.random() * 256); 
    const b = Math.floor(Math.random() * 256); 

    const pastelR = Math.floor((r + 255) / 2);
    const pastelG = Math.floor((g + 255) / 2);
    const pastelB = Math.floor((b + 255) / 2);

    return `rgb(${pastelR}, ${pastelG}, ${pastelB})`;
  }

}


