import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteHomeComponent } from './note-home/note-home.component';

// -------------meterial-------------------
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddnoteComponent } from './addnote/addnote.component';
import { ViewnoteComponent } from './viewnote/viewnote.component';


@NgModule({
  declarations: [
    AppComponent,
    NoteHomeComponent,
    AddnoteComponent,
    ViewnoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
