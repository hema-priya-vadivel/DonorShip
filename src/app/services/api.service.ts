import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postDonor(data:any){
    return this.http.post<any>("http://localhost:3000/donorList/",data)
  }


  getDonor(){
    return this.http.get<any>("http://localhost:3000/donorList/")
  }

  putDonor(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/donorList/"+id,data)
  }

  deleteDonor(id:number){
    return this.http.delete<any>("http://localhost:3000/donorList/"+id)
  }
}
