import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../Models/employee.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['employeeID', 'firstName','lastName', 'position', 'department', 'contactNumber', 'email'];
  EmpsTable = new MatTableDataSource<Employee>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService, private _liveAnnouncer: LiveAnnouncer) { }

  ngAfterViewInit() {
    // Ensure that EmpsTable is defined before trying to set paginator and sort
    if (this.EmpsTable) {
      this.EmpsTable.paginator = this.paginator;
      this.EmpsTable.sort = this.sort;
    }
  }
  
  

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data: any) => {
      this.EmpsTable = new MatTableDataSource<Employee>(data);
      this.EmpsTable.paginator = this.paginator;
      this.EmpsTable.sort = this.sort; // Set the sort property here
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
