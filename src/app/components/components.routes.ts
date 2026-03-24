import { Routes } from '@angular/router';

import { CrechesComponent } from './creches/creches.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { StudentsComponent } from './students/students.component';
import { LayoutComponent } from './layout/layout.component';
import { AttendancesComponent } from './attendances/attendances.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const COMPONENTS_ROUTES: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: "creches", component: CrechesComponent },
      { path: "classrooms", component: ClassroomsComponent },
      { path: "students", component: StudentsComponent },
      { path: "attendances", component: AttendancesComponent },
      { path: "dashboard", component: DashboardComponent },
    ]
  },
];
