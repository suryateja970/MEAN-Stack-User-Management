import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthguardGuard } from './authguard/authguard.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
path:'',
redirectTo:'/login',
pathMatch:'full'
  },
  {
path:'login',component:LoginComponent
  },
  {
    path:'home',component:HomeComponent,canActivate:[AuthguardGuard]
  },
  {
    path:'home/:id',component:HomeComponent,canActivate:[AuthguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
