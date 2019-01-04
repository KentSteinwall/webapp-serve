//built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
//component
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';

//other
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './user-profile/profile/profile.component';
import { HomeComponent } from './user-profile/home/home.component';
import { Profile1Component } from './user-profile/profile1/profile1.component';
import { Profile2Component } from './user-profile/profile2/profile2.component';
import { MessageComponent } from './user-profile/message/message.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    ProfileComponent,
    HomeComponent,
    Profile1Component,
    Profile2Component,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule 
  ],
  providers: [AuthGuard,UserService,UserProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
