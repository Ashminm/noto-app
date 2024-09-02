import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  SERVER_URL="http://localhost:3000"
  getHomeNote = new BehaviorSubject<any[]>([]);
  getHomeTodo = new BehaviorSubject<any[]>([]);

  constructor(private Http:HttpClient) { }

// ---- Replace to use fetchNotes() => BehaviorSubject    ----------------------------------------------------
  getAllNotes(){
    return this.Http.get(`${this.SERVER_URL}/get-all-notes`)
  }
// ------------------------------------------------------------------------------
  getSinglsNotes(id:any){
    return this.Http.get(`${this.SERVER_URL}/get-single-notes/${id}`)
  }
  AddNotes(data:any){
    return this.Http.post(`${this.SERVER_URL}/add-note`,data)
  }
  DeleteNote(id:any){
    return this.Http.delete(`${this.SERVER_URL}/delete-note/${id}`,)
  }
  editNotes(id:any,data:any){
    return this.Http.put(`${this.SERVER_URL}/Edit-note/${id}`,data)
  }
  recoverArchive(id: string, data: any) {
    return this.Http.post(`${this.SERVER_URL}/reco-archive/${id}`, data);
  }

// ------Replace to use fetchTodo() => BehaviorSubject-------------------------
  getAllTodos(){
    return this.Http.get(`${this.SERVER_URL}/get-all-todo`)
  }
// -----------------------------------------------------------------------------

  getSinglsTodos(id:any){
    return this.Http.get(`${this.SERVER_URL}/get-single-todos/${id}`)
  }
  AddTodo(data:any){
    return this.Http.post(`${this.SERVER_URL}/add-todo`,data)
  }
  DeleteTodo(id:any){
    return this.Http.delete(`${this.SERVER_URL}/delete-todo/${id}`,)
  }
  editTodo(id:any,data:any){
    return this.Http.put(`${this.SERVER_URL}/Edit-todo/${id}`,data)
  }

  getAllTrash(){
    return this.Http.get(`${this.SERVER_URL}/get-trash-all`)
  }
  addTrash(data:any){
    return this.Http.post(`${this.SERVER_URL}/add-trash-all`,data)
  }
  DeleteTrash(id:any){
    return this.Http.delete(`${this.SERVER_URL}/delete-trash/${id}`,)
  }
  emptyTrash(){
    return this.Http.delete(`${this.SERVER_URL}/empty-trash`,)
  }


  addArchive(id: string, data: any) {
    return this.Http.post(`${this.SERVER_URL}/add-archive/${id}`, data);
  }
  getArchive(){
    return this.Http.get(`${this.SERVER_URL}/get-archive`)
  }
  getSinglsArchive(id:any){
    return this.Http.get(`${this.SERVER_URL}/single-archive/${id}`)
  }
  DeleteArchive(id:any){
    return this.Http.delete(`${this.SERVER_URL}/delete-archive/${id}`,)
  }
  emptyArchive(){
    return this.Http.delete(`${this.SERVER_URL}/empty-archive`,)
  }
  


  FetchNotes(){
    return this.Http.get(`${this.SERVER_URL}/get-all-notes`).subscribe((res:any)=>{
      this.getHomeNote.next(res)
      // console.log(res);
      
    })
  }
 
  FetchTodo(){
    return this.Http.get(`${this.SERVER_URL}/get-all-todo`).subscribe((res:any)=>{
      this.getHomeTodo.next(res)
      // console.log(res);
      
    })
  }
  

}
