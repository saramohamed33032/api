import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';


@Component({
  selector: 'app-employetest',
  templateUrl: './employetest.component.html',
  styleUrls: ['./employetest.component.css']
})
export class EmployetestComponent implements OnInit {
  dataSaved = false;  
  employeeForm: any;  
  allEmployees: Observable<Employee[]>;  
  employeeIdUpdate = null;  
  massage = null;

  constructor(private formbulider: FormBuilder, private employeeService:EmployeeService) { }

  ngOnInit() {  
    this.employeeForm = this.formbulider.group({  
      EmpName: ['', [Validators.required]],  
      DateOfBirth: ['', [Validators.required]],  
      EmailId: ['', [Validators.required]],  
      Gender: ['', [Validators.required]],  
      Address: ['', [Validators.required]],  
      PinCode: ['', [Validators.required]],  
    });  
    this.loadAllEmployees();  
  }  
  loadAllEmployees() {  
    this.allEmployees = this.employeeService.getAllEmployee();  
  }

  onFormSubmit() {  
    this.dataSaved = false;  
    const employee = this.employeeForm.value;  
    this.CreateEmployee(employee);  
    this.employeeForm.reset();  
  }  
  loadEmployeeToEdit(employeeId: string) {  
    this.employeeService.getEmployeeById(employeeId).subscribe(employee=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.employeeIdUpdate = employee.EmpID;  
      this.employeeForm.controls['EmpName'].setValue(employee.EmpName);  
     this.employeeForm.controls['DateOfBirth'].setValue(employee.DateOfBirth);  
      this.employeeForm.controls['EmailId'].setValue(employee.EmailID);  
      this.employeeForm.controls['Gender'].setValue(employee.Gender);  
      this.employeeForm.controls['Address'].setValue(employee.Address);  
      this.employeeForm.controls['PinCode'].setValue(employee.PinCode);  
    });  
  
  }  
  CreateEmployee(employee: Employee) {  
    if (this.employeeIdUpdate == null) {  
      this.employeeService.createEmployee(employee).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
          this.loadAllEmployees();  
          this.employeeIdUpdate = null;  
          this.employeeForm.reset();  
        }  
      );  
    } else {  
      employee.EmpID = this.employeeIdUpdate;  
      this.employeeService.updateEmployee(employee).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';  
        this.loadAllEmployees();  
        this.employeeIdUpdate = null;  
        this.employeeForm.reset();  
      });  
    }  
  }   
  deleteEmployee(employeeId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.employeeService.deleteEmployeeById(employeeId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      this.loadAllEmployees();  
      this.employeeIdUpdate = null;  
      this.employeeForm.reset();  
  
    });  
  }  
}  
  resetForm() {  
    this.employeeForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  }


}
