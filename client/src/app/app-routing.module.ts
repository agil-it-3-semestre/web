import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Authentication } from './services/auth/authentication';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // login
  {
    path: '',
    component: LoginComponent
  },
  // home
  {
      path: 'home',
      component: HomeComponent,
      canActivate: [ Authentication    ]
  },
  // login
  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
