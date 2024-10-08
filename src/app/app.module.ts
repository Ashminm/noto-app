import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteHomeComponent } from './note-home/note-home.component';
import { AddnoteComponent } from './addnote/addnote.component';
import { ViewnoteComponent } from './viewnote/viewnote.component';
import { AddtodoComponent } from './addtodo/addtodo.component';
import { DeletenoteComponent } from './deletenote/deletenote.component';
import { CategoryComponent } from './category/category.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';


import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// -------------meterial-------------------
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { TrashComponent } from './trash/trash.component';
import { ArchiveComponent } from './archive/archive.component';
import { PrivetComponent } from './privet/privet.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NoteHomeComponent,
    AddnoteComponent,
    ViewnoteComponent,
    AddtodoComponent,
    DeletenoteComponent,
    CategoryComponent,
    EditTodoComponent,
    TrashComponent,
    ArchiveComponent,
    PrivetComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000, 
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }) ,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
