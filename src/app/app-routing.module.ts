import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteHomeComponent } from './note-home/note-home.component';
import { ViewnoteComponent } from './viewnote/viewnote.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { CategoryComponent } from './category/category.component';
// import { DeletenoteComponent } from './deletenote/deletenote.component';
import { TrashComponent } from './trash/trash.component';
import { ArchiveComponent } from './archive/archive.component';
import { PrivetComponent } from './privet/privet.component';

const routes: Routes = [
  {path:'',component:NoteHomeComponent},
  {path:'view/:id',component:ViewnoteComponent},
  {path:'edit/:id',component:EditTodoComponent},
  {path:'cate/:id',component:CategoryComponent},
  {path:'trash',component:TrashComponent},
  {path:'archive',component:ArchiveComponent},
  {path:'privet',component:PrivetComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

