import { Component,VERSION } from '@angular/core';
import { DeletenoteComponent } from '../deletenote/deletenote.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.css'],
})
export class ViewnoteComponent implements OnInit {
  selectedDate: any;
  selectedTime: string = '00:00';

  isLoading = true;
  inpCont:any=0
  hasChanges: boolean = false;
  NoteUid:any=0
  AllNotes:any={}
  isCopied: boolean = false;


 constructor(private dialog: MatDialog,private aroute:ActivatedRoute,private api:BackendApiService,private toastr:ToastrService,private router:Router) {
  aroute.params.subscribe((res:any)=>{
    this.NoteUid=res.id
    console.log(this.NoteUid);
  })
 }

 ngOnInit() {
  this.getData()
  this.getArchiveSingle()
    const savedLength = sessionStorage.getItem('InputCount');
    this.inpCont = savedLength ? JSON.parse(savedLength) : 0;
    
 }

 getData(){
  this.api.getSinglsNotes(this.NoteUid).subscribe((res:any)=>{
    this.AllNotes=res
    // console.log(this.AllNotes);
    this.isLoading = false;
  })
 }

 getArchiveSingle(){
  this.api.getSinglsArchive(this.NoteUid).subscribe((res:any)=>{
    this.AllNotes=res
    //  console.log(this.AllNotes);
    this.isLoading = false;
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
      this.toastr.error(err.error);
    }
  );
}

inpLen(event: any): void {
  const inp = event.target.value.length;
  // console.log('Input length:', inp);
  this.inpCont = inp;
  sessionStorage.setItem('InputCount', JSON.stringify(inp));
}

copy(textArea: HTMLTextAreaElement, input: HTMLInputElement) {
  const text = textArea.value;
  const text1 = input.value;
  const combinedText = `${text1}\n${text}`;

  navigator.clipboard.writeText(combinedText)
    .then(() => {
      console.log(text);
      this.isCopied = true; 
      setTimeout(() => {
        this.isCopied = false; 
      }, 3000); 
    })
    .catch(() => {
      console.log('Failed to copy text');
    });
}


shareData(title: string, body: string) {
  const text = `${title}\n\n${body}`;

  if (navigator.share) {
    navigator.share({
      title: 'Shared Note',
      text: text,
      url: window.location.href
    }).then(() => {
      console.log('Successfully shared');
    }).catch((error) => {
      console.log('Error sharing:', error);
    });
  } else {
    // this.copyToClipboard(text);
    console.log('Sharing not supported, content copied to clipboard instead.');
  }
}

archived() {
  // const id = this.AllNotes._id; 

  this.api.addArchive(this.NoteUid, this.AllNotes).subscribe({
    next: (res: any) => {
      console.log(res);
      this.toastr.success("Archived");
      this.router.navigateByUrl('/');
    },
    error: (err: any) => {
      console.log(err);
      this.toastr.error("Failed to archive note");
      this.toastr.info(err.error)
    }
  });
}
addtoPrivet() {
  // const id = this.AllNotes._id; 
  if(sessionStorage.getItem('token')){
    this.api.addtoPrivet(this.NoteUid, this.AllNotes).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success("Note is privet");
        this.router.navigateByUrl('/');
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error("Faileded!! please enter your passscode!! ",err.error);
      }
    });
  }else{
    this.toastr.info("Please enter your passcode!!")
  }  
}

openDelete(_id: string | undefined, enterAnimationDuration: string, exitAnimationDuration: string): void {

  const dialogRef = this.dialog.open(DeletenoteComponent, {
    width: '250px',
    enterAnimationDuration,
    exitAnimationDuration,
    data: { _id }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.getData();
    }
  });
}

logDate(event: any) {
  const selected = new Date(event.value); // Convert the selected value to a Date object
  console.log('Selected Date:', selected.toDateString()); // Log the date in a readable format
}

AMPM(event:any){
  console.log(event.value);
  
}

}
