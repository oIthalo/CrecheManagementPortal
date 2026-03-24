import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {
  LucideAngularModule,
  LayoutDashboard,
  CalendarCheck,
  School,
  Users,
  LogOut,
  X,
  University,
} from 'lucide-angular';
import { CrechesService } from '../../services/creches.service';

@Component({
  selector: 'app-botton-nav',
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './botton-nav.component.html'
})
export class ButtonNavComponent implements OnInit {
  readonly layoutDashboardIcon = LayoutDashboard
  readonly usersIcon = Users
  readonly calendarIcon = CalendarCheck
  readonly schoolIcon = School
  readonly logoutIcon = LogOut
  readonly universityIcon = University

  isDesktop = window.innerWidth >= 768;
  sidebarOpened: boolean = false
  darkMode: boolean = false
  selectedCreche: boolean = false
  crecheIdentifier?: string
  routeUrl!: string;

  constructor(
    private _crechesService: CrechesService,
    private _router: Router
  ) { }

  ngOnInit() {
    window.addEventListener('resize', () => {
      this.isDesktop = window.innerWidth >= 768;
    });

    this.loadCrecheIsSelected();
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
