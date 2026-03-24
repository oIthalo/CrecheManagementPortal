import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  School,
  Users,
  Plus,
  ArrowRight,
  MapPin,
  Phone,
  LucideAngularModule,
}
  from 'lucide-angular';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ClassroomResponse } from '../../responses/classroom/classroom.response';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-classrooms',
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './classrooms.component.html'
})
export class ClassroomsComponent {
  readonly usersIcon = Users
  readonly schoolIcon = School
  readonly arrowRightIcon = ArrowRight
  readonly plusIcon = Plus
  readonly phoneIcon = Phone
  readonly mapPinIcon = MapPin

  selectedYear = new Date().getFullYear();
  maxYear = new Date().getFullYear();

  classrooms: ClassroomResponse[] = [
    {
      identifier: '1',
      name: 'Maternal I',
      year: 2025,
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
      students: [
        {
          identifier: 's6',
          registrationId: 'PRE-001',
          name: 'Gabriel Souza'
        }
      ]
    }
  ];
}
