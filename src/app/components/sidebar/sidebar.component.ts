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
import { AuthService } from '../../services/auth.service';
import { CrechesService } from '../../services/creches.service';

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

  isDesktop = window.innerWidth >= 768;
  sidebarOpened: boolean = false
  darkMode: boolean = false
  selectedCreche: boolean = false
  crecheIdentifier?: string
  routeUrl!: string;
  user!: User;

  constructor(
    private _crechesService: CrechesService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    window.addEventListener('resize', () => {
      this.isDesktop = window.innerWidth >= 768;
    });

    if (this.isDesktop)
      this.sidebarOpened = true;

    this.loadCrecheIsSelected();
    this.user = this._authService.getUser()!;
    this.routeUrl = this._router.url;
  }

  loadCrecheIsSelected() {
    this._crechesService.selectedCreche.subscribe(c => {
      if (c) {
        this.crecheIdentifier = c.identifier;
        this.selectedCreche = true;
      }
    })
  }
}
