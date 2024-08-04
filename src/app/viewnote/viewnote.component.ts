import { Component } from '@angular/core';
import { DeletenoteComponent } from '../deletenote/deletenote.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.css']
})
export class ViewnoteComponent implements OnInit {

  NoteUid:any=0
  AllNotes:any={}
 constructor(private dialog: MatDialog,private aroute:ActivatedRoute,private api:BackendApiService,private toastr:ToastrService) {
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
    console.log(this.AllNotes);
  })
 }

 editNotes(note: any) {
  this.api.editNotes(note._id, note).subscribe(
    (res: any) => {
      const index = this.AllNotes.findIndex((t: any) => t._id === note._id);
      if (index !== -1) {
        this.AllNotes[index] = res;
      }
      this.toastr.success("Updated successfully!!");
    },
    error => {
      console.error('Error updating note:', error);
      if (error.status === 409) {
        this.toastr.info(`${note.title} already exists in the list!`);
      } else {
        this.toastr.error('An error occurred while updating the note.');
      }
    }
  );
}




  openDelete(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeletenoteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
