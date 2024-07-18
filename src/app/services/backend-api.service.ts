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
  getAllTodos(){
    return this.Http.get(`${this.SERVER_URL}/get-all-todo`)
  }
  getSinglsTodos(id:any){
    return this.Http.get(`${this.SERVER_URL}/get-single-todos/${id}`)
  }
  AddTodo(data:any){
    return this.Http.post(`${this.SERVER_URL}/add-todo`,data)
  }
}
