import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardResponse } from '../../responses/dashboard/dashboard.response';
import {
  LucideAngularModule,
  School
} from 'lucide-angular';
import { CrecheResponse } from '../../responses/creche/creche.response';
import { CrechesService } from '../../services/creches.service';
import { Router } from '@angular/router';
import { ErrorResponse } from '../../responses/default/error.response';

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
  readonly schoolIcon = School;

  errorResponse?: ErrorResponse
  dashboard!: DashboardResponse;
  creche!: CrecheResponse;
  isLoading = false;
  isError = false;

  constructor(
    private _crecheService: CrechesService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loadCreche();
    this.loadDashboard();
  }

  loadDashboard() {
    this.isLoading = true;

    this._crecheService.getDashboard(this.creche.identifier)
      .subscribe({
        next: res => {
          this.dashboard = res.data;
          this.isLoading = false;
        },
        error: res => {
          this.errorResponse = res;
          this.isError = true;
          this.isLoading = false;
        }
      })
  }

  loadCreche() {
    this.isLoading = true;

    this._crecheService.selectedCreche.subscribe({
      next: res => {
        if (res) {
          this.creche = res;
          this.isLoading = false;
        }
        else {
          this._router.navigate(["/creches"])
        }
      },
      error: () => {
        this.isError = true;
      }
    })
  }
}
