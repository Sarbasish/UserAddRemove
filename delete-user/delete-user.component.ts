import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  @Input()
  deleteUserData : any;
  currentData:any;

  constructor(private employeeService:EmployeeService, public activeModal:NgbActiveModal) { }

  ngOnInit() {
    this.currentData = this.deleteUserData;
  }

  deleteEmp(currentData){
    this.employeeService.deleteEmployee(this.currentData.id).subscribe(
      (response) => {
        this.closemodal(true);
        if(response){
          }
        });
  }
  
  closemodal(value){
    this.activeModal.close(value);
   }
}