import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee.model';
import { EmployeeDTO } from '../Models/employeeDTO.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'YourApiUrlHere';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}`);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: EmployeeDTO): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}`, employee);
  }

  updateEmployee(employee: Employee): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${employee.employeeID}`, employee);
  }

  deleteEmployee(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${id}`);
  }
}
