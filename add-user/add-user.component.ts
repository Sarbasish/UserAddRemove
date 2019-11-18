import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmpRequest } from '../EmpRequest';
import { EmployeeService } from '../employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  departmentsList: any;
  selectedDept: string;
  empData: any;
  addEmpForm: FormGroup;
  @Output()
  addEvent = new EventEmitter<String>();
  addFlag: boolean;
  @Input()
  editUserData: any;
  currentData: any;

  constructor(
     //private spinner: NgxSpinnerService,
    private employeeService: EmployeeService, public activeModal: NgbActiveModal, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.departmentsList = [

      {
        "Id": "1",
        "Name": "HR"
      },
      {
        "Id": "2",
        "Name": "FINANCE"
      },
      {
        "Id": "3",
        "Name": "SALES"
      },
      {
        "Id": "4",
        "Name": "TECHNOLOGY"
      },
      {
        "Id": "5",
        "Name": "MARKETING"
      },
    ];
    if (this.editUserData === undefined) {
      this.addFlag = true;
      this.addEmpForm = this.fb.group({
        e_id: [''],
        e_name: [''],
        e_subject: [''],
        e_department: ['']
      })
    } else {
      this.addFlag = false;
      this.currentData = this.editUserData;
      this.addEmpForm = this.fb.group({
        e_id: [this.currentData.id],
        e_name: [this.currentData.name],
        e_subject: [this.currentData.subject],
        e_department: [this.currentData.deptName]
      })
    }
  }

  addUser(value) {
    let empRequest = new EmpRequest();
    empRequest.empId = value.e_id;
    empRequest.empName = value.e_name;
    empRequest.empSubject = value.e_subject;
    if (this.addFlag == true) {
      // this.spinner.show();
      empRequest.deptId = value.e_department;
      // let addResponse = this.employeeService.createEmployee(empRequest);
      this.employeeService.createEmployee(empRequest).subscribe(
        (response) => {
          if (response) {
            let addedEmpId = empRequest.empId.toString();
            this.addEvent.emit(addedEmpId);
            // this.spinner.hide();
            this.closemodal(true);
          }
        });
      // return addResponse;
    } 
    // Edit User
    else {
      for (var i = 0; i < this.departmentsList.length; i++) {
        let deptObject = this.departmentsList[i];
        if (value.e_department === deptObject.Name) {
          empRequest.deptId = deptObject.Id;
        }
      }
      this.employeeService.updateEmployee(empRequest).subscribe((data) => {
        this.closemodal(true);
      },
        err => {
          console.log(err, "Error Message is here");
          return err;
        });
    }
  }

  closemodal(value) {
    this.activeModal.close(value);
  }
}