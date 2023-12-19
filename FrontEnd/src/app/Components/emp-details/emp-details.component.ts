import { Component, Input } from '@angular/core';
import { Employee } from '../../Models/employee.model';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css'],
})
export class EmpDetailsComponent {
  @Input() employee: Employee | undefined;
  employeeId: number | undefined;
  inputEmployeeId: number | undefined; // Separate variable for input value

  constructor(private employeeService: EmployeeService) {}

  // Fetch employee only when the button is clicked
  fetchEmployee(): void {
    if (this.inputEmployeeId) {
      this.employeeService.getEmployee(this.inputEmployeeId).subscribe(
        (result: Employee) => {
          this.employee = result;
          this.employeeId = this.inputEmployeeId; // Update employeeId here
          console.log('Employee fetched successfully', this.employee);
        },
        (error) => {
          console.error('Error fetching employee', error);
          alert("Error fetching employee or employee does not exist.");
        }
      );
    }
  }
  validateNumberInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);

    // Allow only digits
    if (!/^\d+$/.test(inputChar)) {
        event.preventDefault();
    }
}
}
