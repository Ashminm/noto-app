import { Component } from '@angular/core';
import { DeletenoteComponent } from '../deletenote/deletenote.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.css']
})
export class ViewnoteComponent implements OnInit {

  NoteUid:any=0
  AllNotes:any={}
 constructor(private dialog: MatDialog,private aroute:ActivatedRoute,private api:BackendApiService) {
  aroute.params.subscribe((res:any)=>{
    this.NoteUid=res.id
    // console.log(this.NoteUid);
  })
 }

 ngOnInit() {
  this.getData()
   
 }

 getData(){
  this.api.getSinglsNotes(this.NoteUid).subscribe((res:any)=>{
    this.AllNotes=res
    // console.log(this.AllNotes);
  })
 }

  openDelete(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeletenoteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
