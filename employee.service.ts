import { Injectable } from '@angular/core';
import{ HttpClient, HttpRequest, HttpParams, HttpHeaders,} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Employee  } from './employee';
import { EmpRequest } from './EmpRequest';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

employeesUrl = 'http://172.25.46.59:8080/demo/employees/';
  //  employeesUrl = 'http://localhost:8080/demo/employees/';
  
  constructor(private http:HttpClient) { 
  }

  getEmployees (){  
      return this.http.get(this.employeesUrl)
      .map((response:Response)=>{
      const data:any = response;
      return data;
      });
  } 

  createEmployee(emp : EmpRequest){
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const data = JSON.stringify(emp);
    return this.http.post(this.employeesUrl,data,httpOptions);
  }

updateEmployee(emp : EmpRequest) : any {
      const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const data = JSON.stringify(emp);
    return this.http.put(this.employeesUrl+emp.empId,data,httpOptions)
    .map((response:Response)=>{
      const updatedData:any = response;
      console.log("PUT Request is successful ",updatedData);
      return updatedData;
      });
  }

  deleteEmployee(id : String)
   {
      console.log(this.employeesUrl, id,"its show url and id");
    return this.http.delete(this.employeesUrl+id,{ headers: new HttpHeaders().set( "Content-Type", "application/json"), responseType:"text"}).map(
      responseData  => {
        console.log("DELETE Request is successful ", responseData);
        return responseData;
      },
      error  => {
            console.log("Error", error);
            return error;
      }
    );
  }
}