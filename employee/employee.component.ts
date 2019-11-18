import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from "../employee.service";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/';

import { EdituserComponent } from '../edituser/edituser.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
// import swal from 'sweetalert';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
// const Swal = require('sweetalert2');
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  dataList : any;
  showDeleteMessage = false;
  showEditMessage = false;
  showAddMessage = false;
  empId: string;
  showSpinner : boolean;
  //@ViewChild('deleteSwal') private deleteSwal;

  constructor(private EmployeeService: EmployeeService, private modalService: NgbModal) { }

  ngOnInit() {
    this.showSpinner = true;
    this.retrieveData();
  }

  retrieveData() {
    this.EmployeeService.getEmployees().subscribe((data) => {
      this.showSpinner = false;
      this.dataList = data;
      console.log("Refreshed data :  ",this.dataList);
    },
      err => {
        console.log(err, "Error Message is here");
      });
  }

  editData(data) {
    var _this = this;
    _this.showDeleteMessage = false;
    _this.showEditMessage = false;
    _this.showAddMessage = false;
    _this.empId = data.id;
    const modalref = this.modalService.open(AddUserComponent);
    modalref.componentInstance.editUserData = data;
    _this.showSpinner = true;
    modalref.result.then(function (res) {
      if (res == true) {
        _this.showEditMessage = true;
         _this.retrieveData();
      }
    }, () => {});
  }

  deleteData(data) {

    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
 
    });
    // Swal({
    //   title: 'Info!',
    //   text: "Are You Sure You Want to OverWrite and Update the Following KRI's ?",
    //   confirmButtonText: 'Ok',
    //   customClass: "green-theme"
    // }).then(function () {

    // swal({
    //   title: "Good job!",
    //   text: "You clicked the button!",
    //   icon: "success",
    // });
    
    // swal({
    //   title: 'Are you sure?',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!'
    // }).then((result) => {
    //   if (result.value) {
    //     swal(
    //       'Deleted!',
    //       'Your file has been deleted.',
    //       'success'
    //     )
    //   }
    // })
    var _this = this;
    _this.showDeleteMessage = false;
    _this.showEditMessage = false;
    _this.showAddMessage = false;
    _this.empId = data.id;
    // const modalref = this.modalService.open(DeleteUserComponent);
    // modalref.componentInstance.deleteUserData = data;
    // _this.showSpinner = true;
    // modalref.result.then(function (res) {
    //   if (res == true) {
    //     _this.showDeleteMessage = true;
    //       _this.retrieveData();
    //   }
    // }, () => {});
  }

  addData() {
    var _this = this;
    _this.showDeleteMessage = false;
    _this.showEditMessage = false;
    _this.showAddMessage = false;
    const modalref = this.modalService.open(AddUserComponent);
    modalref.componentInstance.addEvent.subscribe((receivedId) => {
      _this.empId = receivedId;
    });
    _this.showSpinner = true;
    modalref.result.then(function (res) {
      if (res == true) {
        _this.showAddMessage = true;
          _this.retrieveData();
      }
    },() => {});
  }
}