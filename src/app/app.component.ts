import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogformComponent } from './dialogform/dialogform.component';
import { ApiService } from './services/api.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'Register as a New Donor!';
  displayedColumns: string[] = ['firstName','lastName',
  'age','dob','address','phoneNo', 'bloodGroup','healthDetails','organstoDonate','specificPurpose','action'];
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

constructor(private dialogform:MatDialog,private api:ApiService){}

ngOnInit(): void{
  this.getDonors();
}
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialogform.open(DialogformComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration
    }).afterClosed().subscribe(val=>{
      if(val=='submit'){
        this.getDonors()
      }
    })
  }

  getDonors(){
    this.api.getDonor()
    .subscribe({
      next: (res) =>{
        this.dataSource=new MatTableDataSource(res)
        this.dataSource.paginator=this.paginator
        this.dataSource.sort=this.sort
      },
      error:(err)=>{
        alert("Fetching Records...")
      }
    })
  }

  editDonor(row:any){
    this.dialogform.open(DialogformComponent, {
      width: '50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val=='updated'){
        this.getDonors()
      }
    })
  }

  deleteDonor(id:number){
    this.api.deleteDonor(id)
    .subscribe({
      next:(res)=>{
        alert("Details Deleted Successfully")
        this.getDonors()
      },
      error:(err)=>{
        alert("Details not Deleted!")
        this.getDonors()
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

