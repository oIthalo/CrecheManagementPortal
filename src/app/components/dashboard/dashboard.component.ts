import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardResponse } from '../../responses/dashboard/dashboard.response';
import {
  LucideAngularModule,
  School
} from 'lucide-angular';
import { CrecheResponse } from '../../responses/creche/creche.response';

@Component({
  selector: 'app-dashboard',
  imports: [
    LucideAngularModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  readonly schoolIcon = School

  dashboard!: DashboardResponse
  creche!: CrecheResponse

  ngOnInit(): void {
    this.loadDashboard()
  }

  loadDashboard() {
    this.dashboard = {
      crecheName: 'Creche Alegria',
      totalStudents: 120,
      totalClassrooms: 6,
      presentToday: 95,
      absentToday: 25,
      attendanceRate: 79,
      classrooms: [
        {
          id: '1',
          name: 'Maternal I',
          totalStudents: 20,
          present: 16,
          absent: 4
        },
        {
          id: '2',
          name: 'Maternal II',
          totalStudents: 22,
          present: 18,
          absent: 4
        },
        {
          id: '3',
          name: 'Jardim I',
          totalStudents: 18,
          present: 14,
          absent: 4
        },
        {
          id: '4',
          name: 'Jardim II',
          totalStudents: 25,
          present: 20,
          absent: 5
        }
      ]
    }

    this.creche = {
      identifier: 'crch_001',
      name: 'Creche Pequenos Sonhos',
      email: 'contato@pequenossonhos.com',
      contactNumber: '(75) 99123-4567',
      address: {
        street: 'Rua das Flores',
        number: '120',
        city: 'Santo Antônio de Jesus',
        state: 'BA'
      }
    }
  }
}
