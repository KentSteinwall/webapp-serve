import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserProfile1 } from './user-profile1.model';
@Injectable()
export class DriverService {
  selectEmployee: UserProfile1;
  employees: UserProfile1[];
  readonly baseURL='http://localhost:3000/driver';

  constructor(private http: HttpClient){}
  postEmployee(dri: UserProfile1){
      return this.http.post(this.baseURL,dri);
  }
  userpostEmployee(ins: UserProfile1){
    return this.http.post(this.baseURL+'/user',ins);
   }
  getEmployeeList(){
      return this.http.get(this.baseURL);
  }
  putEmployee(dri: UserProfile1) {
   return this.http.put(this.baseURL + `/${dri._id}`, dri);
 }
 userputEmployee(dri: UserProfile1) {
  return this.http.put(this.baseURL+'/user' + `/${dri.nic}`, dri);
}
 deleteEmployee(_id: string) {
   return this.http.delete(this.baseURL + `/${_id}`);
 }
 userdeleteEmployee(nic: string) {
  return this.http.delete(this.baseURL+'/user' + `/${nic}`);
}
 /*sendMail(Email:string){
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.http.post('http://localhost:3000/mail/sendmail',{Email},{headers: headers});
}*/
}


