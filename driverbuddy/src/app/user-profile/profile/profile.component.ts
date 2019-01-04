import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../../shared/user-profile.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { UserProfile } from '../../shared/user-profile.model';
import { User1 } from '../../shared/user1.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[InsuranceService]
})
export class ProfileComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  nicRegex=/^\d{9}[v]$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(private UserProfileService: InsuranceService, private router: Router) { }
  
  ngOnInit() {
    
    
   this.refreshEmployeeList();
   this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form)
    form.resetForm();
    this.UserProfileService.selectEmployee = {
      _id:"",
      firstName :"",
      lastName :"",
      nic:"",
      mobile:null,
      email: "",
      agentId: "",
           
    }
    //form.resetForm();
    this.serverErrorMessages = '';
  }
  onLogout(){
   // this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  onSignup(){
    this.router.navigate(['/signup']);
  }
  
  onSubmit(form: NgForm) {
    
    if(form.value._id ==""){
      this.UserProfileService.userpostEmployee(form.value).subscribe(
        res=>{
          //alert('sucess');
        },
        err=>{
          //alert('error');
        }
      )
    this.UserProfileService.postEmployee(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
        this.refreshEmployeeList();
        //this.UserProfileService.userpostEmployee(form.value);
       
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.';
      }
    );
    }
    else{
      this.UserProfileService.userputEmployee(form.value).subscribe(
        res=>{
          alert('sucess');
        },
        err=>{
          alert('error');
        }
      )
      this.UserProfileService.putEmployee(form.value).subscribe(
        res => {
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.resetForm(form);
          this.refreshEmployeeList();
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          }
          else
            this.serverErrorMessages = 'Something went wrong.';
        }
      );
    }
    
  }
  




  refreshEmployeeList()
  {
    this.UserProfileService.getEmployeeList().subscribe((res)=> {
      this.UserProfileService.employees= res as UserProfile[];
    });
  }
  onEdit(ins : UserProfile)
  { this.UserProfileService.selectEmployee=ins;

  }
  onDelete(_id: string,nic:string, form: NgForm) {
    
    if (confirm('Are you sure to delete this record ?') == true) {
      this.UserProfileService.userdeleteEmployee(nic).subscribe(
        res=>{
          alert('sucess');
        },
        err=>{
          alert('error');
        }
      )
      this.UserProfileService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        
      });
      
    }
  }


}
