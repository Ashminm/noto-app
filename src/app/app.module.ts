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


import {HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// -------------meterial-------------------
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { EditTodoComponent } from './edit-todo/edit-todo.component';




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
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
