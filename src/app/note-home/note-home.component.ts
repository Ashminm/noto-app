import { Component } from '@angular/core';
import { DeletenoteComponent } from '../deletenote/deletenote.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-note-home',
  templateUrl: './note-home.component.html',
  styleUrls: ['./note-home.component.css']
})
export class NoteHomeComponent {
  constructor(private dialog: MatDialog) {}
  openDelete(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeletenoteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
