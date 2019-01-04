import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserProfile } from './user-profile.model';
import { User1 } from './user1.model';
@Injectable()
export class InsuranceService {
   selectEmployee: UserProfile;
   employees: UserProfile[];
   readonly baseURL='http://localhost:3000/insurance';
   //readonly baseURL1='http://localhost:3000/insurance/user';

   constructor(private http: HttpClient){}
   postEmployee(ins: UserProfile){
       return this.http.post(this.baseURL,ins);
   }
   userpostEmployee(ins: UserProfile){
    return this.http.post(this.baseURL+'/user',ins);
   }
   getEmployeeList(){
       return this.http.get(this.baseURL);
   }
   putEmployee(ins: UserProfile) {
    return this.http.put(this.baseURL + `/${ins._id}`, ins);
  }
  userputEmployee(ins: UserProfile) {
    return this.http.put(this.baseURL+'/user' + `/${ins.nic}`, ins);
  }
  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  userdeleteEmployee(nic: string) {
    return this.http.delete(this.baseURL+'/user' +`/${nic}`);
  }
 /* sendMail(Email:string){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/mail/sendmail',{Email},{headers: headers});
  }*/
}

 