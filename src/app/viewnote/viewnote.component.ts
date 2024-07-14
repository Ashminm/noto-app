import { Component } from '@angular/core';
import { DeletenoteComponent } from '../deletenote/deletenote.component';
import { MatDialog } from '@angular/material/dialog';
import { EditnoteComponent } from '../editnote/editnote.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.css']
})
export class ViewnoteComponent {

 constructor(private dialog: MatDialog) {}

  openDelete(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeletenoteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openEdit(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditnoteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
