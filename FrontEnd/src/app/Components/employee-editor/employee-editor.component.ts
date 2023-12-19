import { Component, Input} from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { Employee } from '../../Models/employee.model';
import { Subscription } from 'rxjs';
import { Picture } from '../../Models/picture.model';
import { PictureService } from '../../Services/picture.service';
import { getFile} from 'easy-file-picker';
import { PictureComponent } from '../picture/picture.component';

@Component({
  selector: 'app-employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrls: ['./employee-editor.component.css']
})
export class EmployeeEditorComponent{
  @Input() employee: Employee | undefined;
  employeeId: number | undefined;
  inputEmployeeId: number | undefined; 
  selectedPicture: any;

  pictureData: Picture = {
    profilePicture : '',
  };
  
  constructor(private employeeService: EmployeeService, private pictureService:PictureService) { }

  saveEmployee(): void {
    if (this.employee) {
      this.employeeService.updateEmployee(this.employee).subscribe(
        (ID : number) =>{
          console.log("Employee updated successfully.");
          if(this.selectedPicture){
            this.pictureService.updatePicture(ID,this.pictureData).subscribe(
              () => {
                this.selectedPicture = null;
                this.fetchEmployee();
                console.log('Picture update successfully');
                alert("Employee updated successfully with picture.");
              },(error) =>{
                console.error("Failed to update picture");
                alert("Employee updated successfully but an error occured while updating picture.")
              }
            )
          }
          else {
            alert("Employee updated successfully without picture.");
          }
        },
        (error) =>{
            console.error('Failed to update employee.');
            alert('Failed to update employee.');
        }
      );
    }
  }

  fetchEmployee(): void {
    if (this.inputEmployeeId) {
      this.employeeService.getEmployee(this.inputEmployeeId).subscribe(
        (result: Employee) => {
          this.employee = result;
          this.employeeId = this.inputEmployeeId;
          console.log('Employee fetched successfully ', this.employee);
        },
        error => {
          console.error('Error fetching employee', error);
          alert("Error fetching employee or employee does not exist.")
        }
      );
    }
  }

  async changePicture(): Promise<void> {
    const file = await getFile();
    if (this.isFileAnImage(file)) {
      this.convertFileToDataURL(file);
      console.log('Selected file:', file);
    } else {
      console.warn('Selected file is not an image. Please choose an image file.');
    }
  }
  
  // Helper method to check if the file is an image
  private isFileAnImage(file: Blob): boolean {
    return file.type.startsWith('image/');
  }

  convertFileToDataURL(file: Blob): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.selectedPicture = reader.result;
      const base64String = reader.result as string;
      this.pictureData.profilePicture = base64String.split(',')[1];
    };
    reader.readAsDataURL(file);
  }

  validateNumberInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);

    // Allow only digits
    if (!/^\d+$/.test(inputChar)) {
        event.preventDefault();
    }
  }
}
