// app-remove-employee.component.ts

import { Component, Input } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { PictureService } from '../../Services/picture.service';

@Component({
  selector: 'app-remove-employee',
  templateUrl: './remove-employee.component.html',
  styleUrls: ['./remove-employee.component.css']
})
export class RemoveEmployeeComponent {
  @Input() employeeId: number | undefined;

  constructor(private employeeService: EmployeeService, private pictureService:PictureService) {}

  removeEmployee(): void {
    if (this.employeeId !== undefined) {
      this.employeeService.deleteEmployee(this.employeeId).subscribe(
        (returnValue) => {
          console.log('Employee deleted successfully');
          this.pictureService.deletePicture(returnValue);
          alert("Employee removed successfully.")
        },
        error => {
          console.error('Error deleting employee', error);
          alert("Error removing employee or employee does not exist .")
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
