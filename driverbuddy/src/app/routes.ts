import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
//import { UserProfileComponent } from './user-profile/user-profile.component';

import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { ProfileComponent } from './user-profile/profile/profile.component';
import { Profile1Component } from './user-profile/profile1/profile1.component';
import { Profile2Component } from './user-profile/profile2/profile2.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './user-profile/home/home.component';
import { MessageComponent } from './user-profile/message/message.component';

import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'profile', component: UserProfileComponent,
        children: [{ path: '', component: ProfileComponent }]
    },
    {
        path: 'profile1', component: UserProfileComponent,
        children: [{ path: '', component: Profile1Component }]
    },
    {
        path: 'profile2', component: UserProfileComponent,
        children: [{ path: '', component: Profile2Component }]
    },
    {
        path: 'home', component: UserProfileComponent,
        children: [{ path: '', component: HomeComponent }]
    },
    {
        path: 'message', component: UserProfileComponent ,
        children: [{ path: '', component: MessageComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];