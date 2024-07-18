import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteHomeComponent } from './note-home/note-home.component';
import { ViewnoteComponent } from './viewnote/viewnote.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

const routes: Routes = [
  {path:'',component:NoteHomeComponent},
  {path:'view/:id',component:ViewnoteComponent},
  {path:'edit/:id',component:EditTodoComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

