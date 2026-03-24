import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  LucideAngularModule,
  TextAlignJustify,
  LayoutDashboard,
  CalendarCheck,
  Moon,
  Sun,
  School,
  Users,
  Wallet,
  LogOut,
  X,
  University,
} from 'lucide-angular';

@Component({
  selector: 'app-botton-nav',
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './botton-nav.component.html'
})
export class ButtonNavComponent {
  readonly layoutDashboardIcon = LayoutDashboard
  readonly usersIcon = Users
  readonly calendarIcon = CalendarCheck
  readonly schoolIcon = School
  readonly logoutIcon = LogOut
  readonly universityIcon = University
}
