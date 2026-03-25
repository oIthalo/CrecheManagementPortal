import { Routes } from '@angular/router';

import { CrechesComponent } from './creches/creches.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { StudentsComponent } from './students/students.component';
import { LayoutComponent } from './layout/layout.component';
import { AttendancesComponent } from './attendances/attendances.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';

export const COMPONENTS_ROUTES: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'creches', component: CrechesComponent, canActivate: [authGuard] },
      { path: 'creches/:id/dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'creches/:id/classrooms', component: ClassroomsComponent, canActivate: [authGuard] },
      { path: 'creches/:id/students', component: StudentsComponent, canActivate: [authGuard] },
      { path: 'creches/:id/attendances', component: AttendancesComponent, canActivate: [authGuard] },
    ]
  },
];
