import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EmployeeEditorComponent } from './Components/employee-editor/employee-editor.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { EmpDetailsComponent } from './Components/emp-details/emp-details.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { RemoveEmployeeComponent } from './Components/remove-employee/remove-employee.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employee/editor', component: EmployeeEditorComponent },
  { path: 'details', component: EmpDetailsComponent },
  { path: 'addEmployee', component: AddEmployeeComponent },
  { path: 'removeEmployee', component: RemoveEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
