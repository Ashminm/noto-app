import { Component } from '@angular/core';
import { DeletenoteComponent } from '../deletenote/deletenote.component';
import { MatDialog } from '@angular/material/dialog';
import { BackendApiService } from '../services/backend-api.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-note-home',
  templateUrl: './note-home.component.html',
  styleUrls: ['./note-home.component.css']
})
export class NoteHomeComponent implements OnInit {

  AllNotes:any[]=[]

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

  }

}
