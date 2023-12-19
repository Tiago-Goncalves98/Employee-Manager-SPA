import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './Services/employee.service';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EmployeeEditorComponent } from './Components/employee-editor/employee-editor.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { EmpDetailsComponent } from './Components/emp-details/emp-details.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { RemoveEmployeeComponent } from './Components/remove-employee/remove-employee.component';
import { PictureComponent } from './Components/picture/picture.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeEditorComponent,
    EmployeeListComponent,
    EmpDetailsComponent,
    AddEmployeeComponent,
    RemoveEmployeeComponent,
    PictureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
