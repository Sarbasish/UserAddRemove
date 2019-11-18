import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { HeaderComponent } from './header/header.component';

import { EmployeeService } from './employee.service';
//import { EdituserComponent } from './edituser/edituser.component';
//import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FooterComponent } from './footer/footer.component';
import { AuthServiceService } from './auth-service.service';
import { AuthGuardServiceService } from './auth-guard-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EmployeeComponent,
    HeaderComponent,
   // EdituserComponent,
    //DeleteUserComponent,
    AddUserComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    SweetAlert2Module,
    NgbModule.forRoot()
  ],
  entryComponents: [
    //EdituserComponent,
    //DeleteUserComponent,
    AddUserComponent
  ],
  providers: [EmployeeService, AuthServiceService, AuthGuardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { 





}
