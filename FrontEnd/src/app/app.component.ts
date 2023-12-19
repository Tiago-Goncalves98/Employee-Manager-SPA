import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './Services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Employee Manager"
  employees: any[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data: any) => {
      this.employees = data;
    });
  }
}
