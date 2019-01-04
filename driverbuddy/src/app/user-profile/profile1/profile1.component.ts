import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../shared/user-profile1.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { UserProfile1 } from '../../shared/user-profile1.model';

@Component({
  selector: 'app-profile1',
  templateUrl: './profile1.component.html',
  styleUrls: ['./profile1.component.css'],
  providers:[DriverService]
})
export class Profile1Component implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  nicRegex=/^\d{9}[v]$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(private UserProfileService: DriverService, private router: Router) { }

  ngOnInit() {
    
    
    this.refreshEmployeeList();
    this.resetForm();
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
          //alert('nottt');
        }
      )
    this.UserProfileService.postEmployee(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
        this.refreshEmployeeList();
        //this.UserProfileService.sendMail(form.value.Email);
       
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
      license:null,
      

    }
    //form.resetForm();
    this.serverErrorMessages = '';
  }


  refreshEmployeeList()
  {
    this.UserProfileService.getEmployeeList().subscribe((res)=> {
      this.UserProfileService.employees= res as UserProfile1[];
    });
  }
  onEdit(dri : UserProfile1)
  { this.UserProfileService.selectEmployee=dri;

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
