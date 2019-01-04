import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserProfile2 } from './user-profile2.model';
@Injectable()
export class PoliceService {
   selectEmployee: UserProfile2;
   employees: UserProfile2[];
   readonly baseURL='http://localhost:3000/police';

   constructor(private http: HttpClient){}
   postEmployee(po: UserProfile2){
       return this.http.post(this.baseURL,po);
   }
   userpostEmployee(ins: UserProfile2){
    return this.http.post(this.baseURL+'/user',ins);
   }
   getEmployeeList(){
       return this.http.get(this.baseURL);
   }
   putEmployee(po: UserProfile2) {
    return this.http.put(this.baseURL + `/${po._id}`, po);
  }
  userputEmployee(po: UserProfile2) {
    return this.http.put(this.baseURL+'/user' + `/${po.nic}`, po);
  }
  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  userdeleteEmployee(nic: string) {
    return this.http.delete(this.baseURL+'/user' + `/${nic}`);
  }
}

 
