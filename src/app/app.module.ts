import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteHomeComponent } from './note-home/note-home.component';
import { AddnoteComponent } from './addnote/addnote.component';
import { ViewnoteComponent } from './viewnote/viewnote.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// -------------meterial-------------------
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddtodoComponent } from './addtodo/addtodo.component';


@NgModule({
  declarations: [
    AppComponent,
    NoteHomeComponent,
    AddnoteComponent,
    ViewnoteComponent,
    AddtodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
