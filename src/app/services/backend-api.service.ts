import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  SERVER_URL="http://localhost:3000"

  constructor(private Http:HttpClient) { }

  getAllNotes(){
    return this.Http.get(`${this.SERVER_URL}/get-all-notes`)
  }
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



  getAllTodos(){
    return this.Http.get(`${this.SERVER_URL}/get-all-todo`)
  }
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

  

}
