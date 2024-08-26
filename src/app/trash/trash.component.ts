import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { DeletenoteComponent } from '../deletenote/deletenote.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  AllTrash:any[]=[]

  constructor(private Api:BackendApiService,private dialog: MatDialog){}

  ngOnInit() {
    this.loadTrash()
  }


  loadTrash(){
    this.Api.getAllTrash().subscribe((res:any)=>{
      this.AllTrash=res
      // console.log(this.AllTrash);
    })
  }

  openDeleteTrash(_id:string,enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeletenoteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { _id }
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.AllTrash =this.AllTrash.filter(trash => trash._id !== _id); 
      }
    });
  }

}
