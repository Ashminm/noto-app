import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  SERVER_URL="https://noto-server-lhnc.onrender.com"
  getHomeNote = new BehaviorSubject<any[]>([]);
  getHomeTodo = new BehaviorSubject<any[]>([]);
  getPrivetNote = new BehaviorSubject<any[]>([]);

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
  

  createPasscode(data:any){
    return this.Http.post(`${this.SERVER_URL}/create-passcode`,data)
  }
  checkPasscode(data:any){
    return this.Http.post(`${this.SERVER_URL}/check-passcode`,data)
  }
  forgotpasscode(oldPasscode: any, newPasscode: any) {
    const passcodeData = { oldPasscode, newPasscode };
    return this.Http.put(`${this.SERVER_URL}/forgot-passcode`, passcodeData);
  }
// --------------------- middileware token header set -----------------------
appentTokenHeader(){
  const token=sessionStorage.getItem('token')
  let headers= new HttpHeaders()
  if(token){
    headers=headers.append("Authorization",`Bearer ${token}`)
  }
  return {headers}
}
// -----------------------
  addtoPrivet(id: string, data: any) {
    return this.Http.post(`${this.SERVER_URL}/add-to-privet/${id}`,data,this.appentTokenHeader());
  }
  unPrivet(id:any,data:any){
    return this.Http.post(`${this.SERVER_URL}/unPrivet-note/${id}`, data,this.appentTokenHeader());
  }
  DeletePrivet(id:any){
    return this.Http.delete(`${this.SERVER_URL}/dete-privet/${id}`,this.appentTokenHeader())
  }
  emptyPrivet(){
    return this.Http.delete(`${this.SERVER_URL}/empty-privet`,this.appentTokenHeader())
  }
  newPrivetNote(data:any){
    return this.Http.post(`${this.SERVER_URL}/new-privet-note`,data,this.appentTokenHeader())
  }

  getPrivetNotes(){
    return this.Http.get(`${this.SERVER_URL}/get-privet-notes`,this.appentTokenHeader()).subscribe((res:any)=>{
      this.getPrivetNote.next(res)
    })
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
