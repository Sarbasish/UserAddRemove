import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { EmpRequest } from '../EmpRequest';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  @Input()
  editUserData: any;
  currentData: any;
  editForm: FormGroup;
  departmentsList: any;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.currentData = this.editUserData;
    this.editForm = this.fb.group({
      id: [this.currentData.id],
      name: [this.currentData.name],
      subject: [this.currentData.subject],
      department: [this.currentData.deptName]
    })
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
  }

  updateUser(value) {
    let empRequest = new EmpRequest();
    empRequest.empId = value.id.toString();
    empRequest.empName = value.name;
    empRequest.empSubject = value.subject;
    for (var i = 0; i < this.departmentsList.length; i++) {
      let deptObject = this.departmentsList[i];
      if (value.department === deptObject.Name) {
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

  closemodal(value) {
    this.activeModal.close(value);
  }
}

