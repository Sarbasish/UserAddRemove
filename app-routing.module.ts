import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { AuthGuardServiceService } from './auth-guard-service.service';

const routes: Routes = [

  { path: 'home', component: HomeComponent, canActivate : [AuthGuardServiceService]},
  { path: 'login', component: LoginComponent},
  { path: 'employee', component: EmployeeComponent, canActivate : [AuthGuardServiceService]},
  { path: '', component: LoginComponent}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
