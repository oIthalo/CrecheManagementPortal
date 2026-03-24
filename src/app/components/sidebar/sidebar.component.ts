import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.models';
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
} from 'lucide-angular';
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  readonly textAlignJustifyIcon = TextAlignJustify
  readonly layoutDashboardIcon = LayoutDashboard
  readonly usersIcon = Users
  readonly calendarIcon = CalendarCheck
  readonly schoolIcon = School
  readonly moonIcon = Moon
  readonly sunIcon = Sun
  readonly walletIcon = Wallet
  readonly closeIcon = X
  readonly logoutIcon = LogOut

  sidebarOpened: boolean = true
  darkMode: boolean = false
  selectedCreche: boolean = true
  user: User = {
    Username: "Ithalo Barreto",
    Email: "ithalobarreto333@gmail.com",
  }

  constructor(private _router: Router) { }

  isDesktop = window.innerWidth >= 768;

  ngOnInit() {
    window.addEventListener('resize', () => {
      this.isDesktop = window.innerWidth >= 768;
    });
  }
}
