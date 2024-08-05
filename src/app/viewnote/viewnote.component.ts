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

  hasChanges: boolean = false;
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
    // console.log(this.AllNotes);
  })
 }

 onContentChange() {
  this.hasChanges = true;
}
onReset(){
  this.hasChanges=false
}

 editNotes(id: string, noteData: any) {
  this.api.editNotes(id, noteData).subscribe(
    (res:any)=>{
      console.log('Note updated successfully:', res);
       this.toastr.success("Note updated successfully!!")
       this.hasChanges = false;
    },
    (err:any)=>{
      console.error('Error updating note:', err.error);
      this.toastr.info("Note not updated!!")
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
