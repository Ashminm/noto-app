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

  inpCont:any=0
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
    const savedLength = sessionStorage.getItem('InputCount');
    this.inpCont = savedLength ? JSON.parse(savedLength) : 0;
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
       this.getData()
       this.hasChanges = false;
    },
    (err:any)=>{
      console.error('Error updating note:', err.error);
      this.toastr.info("Note not updated!!")
    }
  );
}

inpLen(event: any): void {
  const inp = event.target.value.length;
  // console.log('Input length:', inp);
  this.inpCont = inp;
  sessionStorage.setItem('InputCount', JSON.stringify(inp));
}




  openDelete(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeletenoteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
