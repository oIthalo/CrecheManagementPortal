import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  ChevronDown,
  LucideAngularModule,
  School
} from 'lucide-angular';
import { Classroom } from '../../models/classroom.models';
import { AttendanceResponse } from '../../responses/attendance/attendance.response';

@Component({
  selector: 'app-attendances',
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './attendances.component.html'
})
export class AttendancesComponent {
  readonly chevronDownIcon = ChevronDown
  readonly schoolIcon = School

  selectedDate: string = new Date().toISOString().substring(0, 10);

  classrooms: Classroom[] = [
    {
      identifier: '1',
      name: 'Maternal I',
      open: false,
      year: 2026,
      students: []
    },
    {
      identifier: '2',
      name: 'Maternal II',
      open: false,
      year: 2026,
      students: []
    }
  ];

  attendances: AttendanceResponse[] = [
    {
      studentName: 'João Pedro',
      registeredBy: 'Prof. Ana',
      date: new Date(2026, 2, 20),
      status: 'Presente'
    },
    {
      studentName: 'Maria Clara',
      registeredBy: 'Prof. Ana',
      date: new Date(2026, 2, 20),
      status: 'Falta'
    },
    {
      studentName: 'Lucas Gabriel',
      registeredBy: 'Prof. João',
      date: new Date(2026, 2, 20),
      status: 'Justificado',
      justification: 'Consulta médica'
    },
    {
      studentName: 'Ana Luiza',
      registeredBy: 'Prof. João',
      date: new Date(2026, 2, 20),
      status: 'Presente'
    },
    {
      studentName: 'Pedro Henrique',
      registeredBy: 'Prof. Ana',
      date: new Date(2026, 2, 20),
      status: 'Falta'
    },
    {
      studentName: 'Gabriel Souza',
      registeredBy: 'Prof. Carla',
      date: new Date(2026, 2, 20),
      status: 'Justificado',
      justification: 'Atestado'
    }
  ];

  toggleClassroom(classroom: Classroom) {
    classroom.open = !classroom.open
  }
}
