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
}
