import { Component,OnInit } from '@angular/core';
import { DeletenoteComponent } from '../deletenote/deletenote.component';
import { MatDialog } from '@angular/material/dialog';
import { BackendApiService } from '../services/backend-api.service';



@Component({
  selector: 'app-note-home',
  templateUrl: './note-home.component.html',
  styleUrls: ['./note-home.component.css']
})
export class NoteHomeComponent implements OnInit {

  AllNotes:any[]=[]
  AllTodos:any[]=[]
  // categories:any[] = [];
  constructor(private dialog: MatDialog,private Api:BackendApiService) {}

  openDelete(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeletenoteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngOnInit() {
    this.Api.getAllNotes().subscribe((res:any)=>{
      this.AllNotes=res
      // console.log(this.AllNotes);
    })
    this.Api.getAllTodos().subscribe((res:any)=>{
      this.AllTodos=res
      // console.log(this.AllTodos);
      
    })

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

}
