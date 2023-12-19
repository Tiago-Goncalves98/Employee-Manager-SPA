import { Component,Input} from '@angular/core';
import { EmployeeDTO } from '../../Models/employeeDTO.model';
import { EmployeeService } from '../../Services/employee.service';
import { PictureService } from '../../Services/picture.service';
import { getFile} from 'easy-file-picker';
import { Picture } from '../../Models/picture.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  @Input() employee: EmployeeDTO = {
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    contactNumber: '',
    email: ''
  };


  selectedPicture: any;

  pictureData: Picture = {
    profilePicture : '',
  };

  constructor (private employeeService:EmployeeService, private pictureService: PictureService){
  }

  ngOnInit() {
  }

  saveEmployee(): void {
    if (this.employee) {
      this.employeeService.addEmployee(this.employee).subscribe(
        (returnValue) => {
          console.log('Employee added successfully', returnValue);
          alert("Employee added successfully.")
          if (this.selectedPicture) {
            this.pictureService.addPicture(returnValue.employeeID, this.pictureData).subscribe(() => {
              console.log('Picture added successfully');
            }, (error) => {
              console.error('Failed to add picture', error);
            });
          }
        },
        (error) => {
          console.error('Error adding employee', error);
          alert("Error adding employee.")
        }
      );
    }
  }
  

  async addPicture(): Promise<void> {
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
