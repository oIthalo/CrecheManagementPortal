import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from '../sidebar/sidebar.component';
import {
  LucideAngularModule,
  School,
  ChevronDown
} from 'lucide-angular';
import { StudentResponse } from '../../responses/student/student.response';
import { Classroom } from '../../models/classroom.models';

@Component({
  selector: 'app-students',
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterModule,
    SidebarComponent,
    FormsModule
  ],
  templateUrl: './students.component.html'
})
export class StudentsComponent {
  readonly schoolIcon = School
  readonly chevronDownIcon = ChevronDown

  selectedYear = new Date().getFullYear();

  classrooms: Classroom[] = [
    {
      identifier: '1',
      name: 'Maternal I',
      year: 2025,
      open: false,
      students: [
        {
          identifier: 's1',
          registrationId: 'MAT-001',
          name: 'João Pedro'
        },
        {
          identifier: 's2',
          registrationId: 'MAT-002',
          name: 'Maria Clara'
        }
      ]
    },
    {
      identifier: '2',
      name: 'Maternal II',
      year: 2025,
      open: false,
      students: [
        {
          identifier: 's3',
          registrationId: 'MAT-003',
          name: 'Lucas Gabriel'
        },
        {
          identifier: 's4',
          registrationId: 'MAT-004',
          name: 'Ana Luiza'
        },
        {
          identifier: 's5',
          registrationId: 'MAT-005',
          name: 'Pedro Henrique'
        }
      ]
    },
    {
      identifier: '3',
      name: 'Pré I',
      year: 2025,
      open: false,
      students: [
        {
          identifier: 's6',
          registrationId: 'PRE-001',
          name: 'Gabriel Souza'
        }
      ]
    }
  ];

  students: StudentResponse[] = Array.from({ length: 25 }, (_, i) => ({
    identifier: `${i + 1}`,
    classroom: ['Maternal I', 'Maternal II', 'Pré I'][i % 3],
    name: `Aluno ${i + 1}`,
    cpf: '000.000.000-00',
    contactNumber: '(75) 99999-9999',
    birthDate: new Date(2019 + (i % 3), 2, 10),
    gender: i % 2 === 0 ? 'Masculino' : 'Feminino',
    registrationId: `MAT-${1000 + i}`,
    dateRegistration: new Date(2024, 0, 10),
    active: i % 4 !== 0,
    documents: i % 3 === 0
      ? ['RG', 'CPF']
      : ['RG']
  }));
}
